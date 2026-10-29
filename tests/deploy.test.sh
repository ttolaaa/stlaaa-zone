#!/usr/bin/env bash
set -euo pipefail

project="$(cd "$(dirname "$0")/.." && pwd)"
workspace="$(mktemp -d)"
trap 'rm -rf -- "$workspace"' EXIT
mkdir -p "$workspace/bin"

cat > "$workspace/bin/docker" <<'MOCK'
#!/usr/bin/env bash
set -euo pipefail
echo "$PORTFOLIO_IMAGE $*" >> "$TEST_LOG"
if [[ "$1" == load ]]; then
  [[ "$TEST_SCENARIO" != load-failure ]]
  exit
fi
if [[ "$1" == inspect ]]; then
  if [[ "$3" == '{{.Config.Image}}' ]]; then
    echo tola-portfolio:previous
  elif [[ "$4" == previous-container || "$TEST_SCENARIO" == success ]]; then
    echo healthy
  else
    echo unhealthy
  fi
  exit
fi
[[ "$1" == compose ]] || exit 1
shift 5
case "$1" in
  ps)
    if [[ -f "$TEST_STATE" ]]; then
      cat "$TEST_STATE"
    elif [[ "$TEST_SCENARIO" != first-failure ]]; then
      echo previous-container
    fi
    ;;
  up)
    if [[ "$PORTFOLIO_IMAGE" == tola-portfolio:previous ]]; then
      echo previous-container > "$TEST_STATE"
    else
      echo new-container > "$TEST_STATE"
      [[ "$TEST_SCENARIO" != up-failure ]] || exit 1
    fi
    ;;
  logs) echo 'Mock container logs' ;;
  down) echo removed > "$TEST_STATE" ;;
  *) exit 1 ;;
esac
MOCK
printf '#!/usr/bin/env bash\nexit 0\n' > "$workspace/bin/flock"
chmod +x "$workspace/bin/docker" "$workspace/bin/flock"
export PATH="$workspace/bin:$PATH"
revision=0123456789abcdef0123456789abcdef01234567

for scenario in success health-failure up-failure first-failure load-failure; do
  export HOME="$workspace/$scenario"
  export TEST_SCENARIO="$scenario"
  export TEST_LOG="$HOME/docker.log"
  export TEST_STATE="$HOME/container-state"
  export PORTFOLIO_IMAGE=unset
  release="$HOME/tola-portfolio/incoming/$revision"
  mkdir -p "$release"
  cp "$project/compose.production.yaml" "$release/compose.production.yaml"
  printf 'mock image archive\n' > "$release/image.tar.gz"
  (cd "$release" && sha256sum image.tar.gz > image.tar.gz.sha256)
  if [[ "$scenario" != first-failure ]]; then
    cp "$project/compose.production.yaml" "$HOME/tola-portfolio/compose.production.yaml"
    printf 'PORTFOLIO_IMAGE=tola-portfolio:previous\nPORTFOLIO_PORT=8080\n' > "$HOME/tola-portfolio/.env"
  fi

  if bash "$project/deploy/deploy.sh" "$revision" 8080 > "$HOME/output.log" 2>&1; then
    [[ "$scenario" == success ]] || { cat "$HOME/output.log"; exit 1; }
    grep -q "$revision" "$HOME/tola-portfolio/current-revision"
    grep -q "PORTFOLIO_IMAGE=tola-portfolio:$revision" "$HOME/tola-portfolio/.env"
    [[ ! -f "$release/image.tar.gz" ]]
  else
    [[ "$scenario" != success ]] || { cat "$HOME/output.log"; exit 1; }
    [[ ! -f "$HOME/tola-portfolio/current-revision" ]]
    case "$scenario" in
      health-failure|up-failure)
        grep -q 'Previous release is healthy again' "$HOME/output.log"
        grep -q 'PORTFOLIO_IMAGE=tola-portfolio:previous' "$HOME/tola-portfolio/.env"
        [[ "$(cat "$TEST_STATE")" == previous-container ]]
        ;;
      first-failure) [[ "$(cat "$TEST_STATE")" == removed ]] ;;
      load-failure) ! grep -q ' up ' "$TEST_LOG" ;;
    esac
  fi
  echo "PASS: $scenario"
done

if bash "$project/deploy/deploy.sh" invalid 8080 > /dev/null 2>&1; then exit 1; fi
if bash "$project/deploy/deploy.sh" "$revision" 99999 > /dev/null 2>&1; then exit 1; fi
echo 'PASS: invalid revision and port rejected'
