#!/usr/bin/env bash
set -euo pipefail

revision="${1:?Usage: deploy.sh COMMIT_SHA [PORT]}"
export PORTFOLIO_PORT="${2:-8080}"
[[ "$revision" =~ ^[0-9a-f]{40}$ ]] || { echo "Invalid commit SHA" >&2; exit 1; }
[[ "$PORTFOLIO_PORT" =~ ^[0-9]+$ ]] && (( 10#$PORTFOLIO_PORT > 0 && 10#$PORTFOLIO_PORT <= 65535 )) || { echo "Invalid host port" >&2; exit 1; }

root="$HOME/tola-portfolio"
release="$root/incoming/$revision"
mkdir -p "$root"
exec 9>"$root/deploy.lock"
flock -w 300 9 || { echo "Another deployment still holds the lock" >&2; exit 1; }
cd "$release"
sha256sum --check image.tar.gz.sha256
docker load --input image.tar.gz
export PORTFOLIO_IMAGE="tola-portfolio:$revision"

compose() {
  docker compose --project-name tola-portfolio --file "$1" "${@:2}"
}

wait_healthy() {
  local container status
  for ((attempt=0; attempt<60; attempt++)); do
    container="$(compose "$1" ps --all --quiet portfolio)" || return 1
    if [[ -n "$container" ]]; then
      status="$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "$container")" || return 1
      case "$status" in
        healthy) return 0 ;;
        unhealthy|exited|dead) return 1 ;;
      esac
    fi
    sleep 2
  done
  echo "Timed out waiting for a healthy container" >&2
  return 1
}

previous_image=""
previous_port="$PORTFOLIO_PORT"
previous_container="$(compose "$release/compose.production.yaml" ps --all --quiet portfolio)"
if [[ -n "$previous_container" ]]; then
  previous_image="$(docker inspect --format '{{.Config.Image}}' "$previous_container")"
  [[ -f "$root/compose.production.yaml" ]] || { echo "Existing deployment is missing its rollback Compose file" >&2; exit 1; }
  cp "$root/compose.production.yaml" "$release/previous-compose.yaml"
  [[ -f "$root/.env" ]] || { echo "Existing deployment is missing its rollback environment" >&2; exit 1; }
  cp "$root/.env" "$release/previous.env"
  previous_port="$(sed -n 's/^PORTFOLIO_PORT=//p' "$release/previous.env")"
  [[ "$previous_port" =~ ^[0-9]+$ ]] || { echo "Invalid previous host port" >&2; exit 1; }
fi

changed=0
rollback() {
  local result=$?
  trap - EXIT INT TERM
  if (( result != 0 && changed == 1 )); then
    echo "Deployment failed. Container logs:" >&2
    compose "$release/compose.production.yaml" logs --tail 80 >&2 || echo "Could not retrieve container logs" >&2
    if [[ -n "$previous_image" ]]; then
      echo "Restoring $previous_image" >&2
      export PORTFOLIO_IMAGE="$previous_image"
      export PORTFOLIO_PORT="$previous_port"
      if compose "$release/previous-compose.yaml" up -d --force-recreate --no-build && wait_healthy "$release/previous-compose.yaml"; then
        cp "$release/previous-compose.yaml" "$root/compose.production.yaml"
        cp "$release/previous.env" "$root/.env"
        echo "Previous release is healthy again" >&2
      else
        echo "ROLLBACK FAILED: manual server intervention is required" >&2
      fi
    else
      echo "No previous release exists; removing the failed first deployment" >&2
      compose "$release/compose.production.yaml" down || echo "Failed to remove unhealthy first deployment" >&2
    fi
  fi
  if [[ -f "$release/image.tar.gz" ]]; then
    rm -- "$release/image.tar.gz"
  fi
  exit "$result"
}
trap rollback EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

changed=1
compose "$release/compose.production.yaml" up -d --force-recreate --no-build
wait_healthy "$release/compose.production.yaml"
cp "$release/compose.production.yaml" "$root/compose.production.yaml"
printf 'PORTFOLIO_IMAGE=%s\nPORTFOLIO_PORT=%s\n' "$PORTFOLIO_IMAGE" "$PORTFOLIO_PORT" > "$root/.env"
printf '%s\n' "$revision" > "$root/current-revision"
changed=0
echo "Deployed healthy release $revision on port $PORTFOLIO_PORT"
