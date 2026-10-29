# Development & deployment guide

For the website's before-and-after story, see the [portfolio showcase](README.md).

A redesigned, responsive portfolio and installable progressive web app. Built with React, Vite, and Workbox, served as static files by an unprivileged Nginx container.

## What is included

- A new editorial UI with light/dark themes and layouts for phones, tablets, laptops, and large monitors.
- Three interactive, explicitly labeled project snippets: **VDODL**, **Clipping**, and **Storyteller**.
- Project dialogs with actual screenshots, feature summaries, limitations, and source links.
- Eiken and GLI case studies, an archive of earlier work, an about section, writing, and social/contact links.
- Current Microsoft Data Center Technician role, previous System Engineer experience, selected impact metrics, and six professional certifications.
- Keyboard navigation, native accessible dialogs, reduced-motion support, and a mobile menu.
- A web app manifest, PNG/maskable/Apple icons, offline caching, update prompts, and platform-specific installation guidance.
- Local fonts and images: no analytics, remote embeds, API keys, or third-party requests needed to browse.

## Run locally

Use Node.js **22.12+** (Node 24 LTS recommended).

```powershell
npm.cmd ci
npm.cmd run dev
```

Open the address printed by Vite, normally **http://localhost:5173**. On macOS/Linux, use `npm` in place of `npm.cmd`.

### Production preview

```powershell
npm.cmd run build
npm.cmd run preview
```

Open **http://localhost:4173**. The production preview, not the development server, enables the service worker.

## Docker deployment

Install Docker Engine/Desktop with the Compose plugin, then run in this folder:

```powershell
docker compose up -d --build
```

Open **http://localhost:8080**.

```powershell
docker compose ps
docker compose logs -f portfolio
docker compose down
```

To select another host port, create a `.env` file containing `PORTFOLIO_PORT=8090`, then recreate the service. No secrets are required.

Or build and run the image directly:

```powershell
docker build -t tola-portfolio .
docker run -d --name tola-portfolio -p 8080:8080 --restart unless-stopped tola-portfolio
```

The multi-stage image builds the static site using Node 24, then serves it using non-root Nginx on container port 8080. Compose uses a read-only filesystem, a temporary `/tmp`, dropped capabilities, and no-new-privileges. No database or persistent volume is needed. The image health check requests `/health`. Nginx supplies SPA fallback, compression, security headers, and cache policies.

**Public deployment:** put a TLS reverse proxy or HTTPS-enabled hosting service in front of port 8080. Service workers and installation require **HTTPS**, except on `localhost`. Accessing a PC's LAN IP over plain HTTP on a phone does **not** enable PWA installation/offline mode. Deploy at the domain root; subpath deployment requires adjusting Vite's base, the manifest scope/start URL, and absolute asset paths.

Docker was unavailable in the implementation environment. Build and runtime configuration are supplied, but validate the image with `docker compose up -d --build` and check its health before public deployment.

## Automatic deployment on Git push

The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) deploys pushes to **main**, plus manual runs from the GitHub Actions tab. A local commit must be **pushed** before the server can receive it. This folder has not been initialized as a Git repository or connected to a remote; automation is prepared but not active until the setup below is complete.

### One-time setup

1. Put this project in your chosen GitHub repository, with the deployment branch named `main`. If you choose a different branch, update `on.push.branches` in the workflow. Push the entire project including the lockfile, generated icons, fonts, and images.
2. Choose a **Linux Docker server** with Bash, `flock`, `sha256sum`, SSH, Docker Engine, and Docker Compose v2 available. Ubuntu/Debian servers normally include the first three tools. The SSH user must be able to run Docker without interactive `sudo` and write to `~/tola-portfolio`. Membership in the Docker group grants host-level control: use a dedicated deployment account and dedicated key.
3. Use a dedicated automation key without an interactive passphrase, and add its public half to the server user's `~/.ssh/authorized_keys`. Store its private half only in GitHub's encrypted environment secret, never in the repository.
4. In GitHub, create **Settings → Environments → production**. Restrict its deployment branches to `main`. For fully automatic deployment, do not enable required reviewer approvals.
5. Add these **environment secrets**:

   | Secret | Value |
   | --- | --- |
   | `DEPLOY_HOST` | Server hostname or IP |
   | `DEPLOY_USER` | Dedicated SSH username |
   | `DEPLOY_SSH_KEY` | Private SSH deployment key, including header/footer |
   | `DEPLOY_KNOWN_HOSTS` | Verified SSH host-key entry for the server |

   Obtain the server's host key through a trusted channel, such as your hosting console. You may collect an entry using `ssh-keyscan -H YOUR_HOST`, but **verify its fingerprint independently before saving it**; the workflow deliberately does not blindly trust keys returned by the network. For a nonstandard SSH port, use `ssh-keyscan -p PORT -H YOUR_HOST` and the matching `[host]:port` entry.
6. Optionally add environment **variables** `DEPLOY_SSH_PORT` (default `22`) and `PORTFOLIO_PORT` (default `8080`). Permit SSH from the GitHub-hosted runner and route public HTTPS to the portfolio port. If your server is accessible only through a private network, use an appropriately configured self-hosted runner instead of `ubuntu-latest`.
7. Push to `main`, or select **Actions → Test and deploy portfolio → Run workflow** on `main`.

### What happens after a push

1. Install locked dependencies, build production assets, and run desktop/mobile browser tests.
2. Test the deployment script's success/failure/rollback paths.
3. Build a Docker image tagged with the commit SHA, start it on the runner using the production Compose configuration, and check its health and homepage. Then transfer its compressed archive, SHA-256 checksum, production Compose file, and deployment script over verified SSH. No container registry or registry credentials are required.
4. On the server, verify the archive checksum, load the image, and recreate the portfolio using [`compose.production.yaml`](compose.production.yaml).
5. Wait up to two minutes for the container's health check. Record the deployed revision only when healthy. If replacement fails, restore the previous image and verify its health; a failed first deployment is removed. A failed rollback is explicitly reported and needs manual intervention.

Failed tests/builds leave the running site untouched. Server deployment uses a lock, and workflow runs do not interrupt a deployment in progress. GitHub may coalesce rapid pending pushes into the latest commit, so the latest successful branch state is the target, rather than a guarantee that every intermediate commit is separately visible. Replacing the single container can briefly interrupt service; this is not a zero-downtime/blue-green setup. Health checks verify Nginx availability; they cannot detect every content or application defect.

The automatically managed deployment lives in `~/tola-portfolio`, uses the Compose project name `tola-portfolio`, and is separate from a manually started development checkout. Stop a previous manual container on the same host port before the first automated deployment. Do not mix the two Compose setups.

Inspect the server deployment:

```bash
cd ~/tola-portfolio
cat current-revision
docker compose -p tola-portfolio -f compose.production.yaml ps
docker compose -p tola-portfolio -f compose.production.yaml logs --tail 100
```

Previous images are retained for rollback; no global image pruning is performed on a potentially shared Docker host. Periodically remove only old portfolio image tags you no longer need. Uploaded image archives are removed after deployment attempts that reach container replacement; archives from interrupted transfers or failed checksum/image loads may require manual cleanup inside `~/tola-portfolio/incoming`. Small per-commit deployment files are retained for troubleshooting.

After workflow/deployment-script changes, push them normally: Actions uses the new files on the next run. Once the remote and server are configured, your usual cycle is **edit → commit → push → automatic tests/build/deployment**.

## PWA behavior

Visit once online and wait for the offline-ready message. Workbox precaches the application shell, local fonts, screenshots, and icons. Subsequent visits and project dialogs work offline. External repositories, articles, and social profiles still need a connection. Initial precaching includes approximately 5 MB of original PNG artwork plus application assets; allow it to finish before disconnecting.

- **Chrome/Edge:** use the footer install action or the browser's install menu.
- **iPhone/iPad:** in Safari, Share → Add to Home Screen.
- **Unsupported browsers:** footer instructions explain the available options; no fake install success is shown.
- **Updates:** open, online tabs check for a new service worker every 60 seconds and when focused, made visible, or reconnected. A new version activates and reloads automatically, so no Update button is required. Deployment/build time and browser scheduling still apply; offline visitors keep the last cached release until reconnecting. Automatic reloads reset temporary preview controls and open dialogs, but preserve the saved theme.
- **Voice preview:** uses built-in browser speech synthesis, which can depend on device voices and connectivity. Errors are displayed. It is not the full Storyteller engine.

For development cache cleanup, use DevTools → Application → Service Workers → Unregister, then clear the site's storage. This also resets your saved theme.

## Tests

Build first; tests run against production assets so service workers can be verified.

```powershell
npm.cmd run build
npx.cmd playwright install chromium
npm.cmd test
```

The suite covers desktop/mobile rendering, image loading, project filters and dialogs, focus restoration, snippet controls, speech-synthesis integration (mocked; actual voice quality is device-dependent), persisted theme, original entry paths, PNG icon dimensions, and offline reloads with cached project screenshots. It checks horizontal overflow at widths from **320px to 2560px**. The test runner starts and stops its own preview server unless one is already running on port 4173.

It also simulates a new service worker release and verifies automatic reload. On Linux or Git Bash, run `bash tests/deploy.test.sh` to exercise deployment success, failed health checks, failed container replacement, first-deploy failure, failed image loading, and rejected inputs with a mocked Docker CLI. These tests are not a substitute for an initial real Docker/SSH smoke test.

## Customize

| File | Purpose |
| --- | --- |
| [`src/data.js`](src/data.js) | Profile, career, outcomes, certifications, project copy, writing, and social links |
| [`src/main.jsx`](src/main.jsx) | Sections, interactive snippets, dialogs, app lifecycle |
| [`src/styles.css`](src/styles.css) | Design tokens, themes, breakpoints, reduced motion |
| [`public/images`](public/images) | Locally stored original portrait and project screenshots |
| [`vite.config.js`](vite.config.js) | PWA manifest and precaching configuration |
| [`scripts/generate-icons.mjs`](scripts/generate-icons.mjs) | Reproducible, dependency-free PNG icon generator |
| [`nginx.conf`](nginx.conf) | Production routing, headers, compression, caching |

Use `npm.cmd run icons` after changing the icon generator. Commit the generated icons and lockfile along with source changes. The footer currently connects through LinkedIn; no email address or resume URL has been invented.

## Source review and content provenance

This is a new implementation, not a copy of the old Create React App/Firebase codebase. Content was reviewed from:

- [Original stlaaa-zone portfolio](https://github.com/ttolaaa/stlaaa-zone): `Intro.js`, `Aboutme.js`, `Project.js`, `Works.js`, `Personal-projects.js`, and `EikenCaseStudy.js`. Preserves the design/engineering background, Eiken vocabulary app, GLI student/admin platforms, Firebase work, GlowTracker, writing, and original social links.
- [VDODL](https://github.com/ttolaaa/VDODL), **master** branch README: quality-selectable video/audio downloads, browser-first with explicit server assistance.
- [ClippingEditor](https://github.com/ttolaaa/ClippingEditor), **main** branch README: local-first clipping, moment ranking, captions, vertical reframing, and optional cloud AI.
- [text2voice_app](https://github.com/ttolaaa/text2voice_app), **main** branch README: Storyteller script controls, natural/browser/Azure engines, and consent-based personal voice features.

Original portrait and Eiken/GLI images come from `stlaaa-zone/src/assets`. Tool screenshots come from each tool's documented screenshot directories. These are portfolio assets from the repositories provided by the owner; confirm rights before republishing them elsewhere. Font files are DM Sans and Manrope from [Google Fonts](https://github.com/google/fonts), distributed under the SIL Open Font License; their licenses are included in [`public/fonts`](public/fonts).

### Current profile update

The owner supplied a LinkedIn experience/certification excerpt on October 29, 2026, after LinkedIn's sign-in wall prevented direct profile access. That supplied text is the source for the Microsoft role (May 2024–present), previous System Engineer role (December 2020–May 2024), selected 27-day/90%/60% outcomes, and six certifications. Career outcomes are owner-reported, not independently audited. Credential IDs, internal project names, and granular infrastructure remediation details are intentionally omitted from the public-facing copy. Certificate links point to the profile rather than invented verification URLs.

The current role is Microsoft Data Center Technician, not the web-app role described in the original portfolio. No invented user counts, availability claims, or live tool deployments have been added. Existing `/about` and `/eiken-app-case-study` URLs remain useful.

**Snippet scope:** video quality and clip duration controls are interactive UI previews with illustrative artwork; they do not download or edit media. Storyteller plays a fixed sample using the browser's voice engine. Full tools open through GitHub links; their backends/models are deliberately not bundled into this portfolio.
