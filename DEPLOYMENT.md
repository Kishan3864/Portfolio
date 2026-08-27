# CI/CD — auto-deploy to kishanportfolio.tech

Every push to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. GitHub's runner does `npm ci` + `npm run build` (Next.js **standalone** output).
2. It assembles `.next/standalone` (server + traced `node_modules` + static + `public`).
3. It `rsync`s that bundle to the VPS over SSH.
4. It reloads the app under PM2.

**The VPS never builds or installs anything** — it only receives files and reloads.
The standalone server reads `.env*` from its own folder, so `.env.local`
(`DATABASE_URL`) lives in the deploy directory and is **never** touched by the
sync (env files are excluded from rsync `--delete`).

---

## One-time setup

### 1. Create an SSH deploy key (on your laptop)

```bash
ssh-keygen -t ed25519 -f deploy_key -C "github-actions-kishanportfolio" -N ""
# produces: deploy_key (private)  and  deploy_key.pub (public)
```

### 2. Authorize the key on the VPS

Copy the **public** key into the server user's authorized_keys:

```bash
# on the VPS, as flexyuser
mkdir -p ~/.ssh && chmod 700 ~/.ssh
echo "PASTE_CONTENTS_OF_deploy_key.pub_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### 3. Add GitHub repository secrets

`Settings → Secrets and variables → Actions → New repository secret`:

| Secret        | Value                                                        |
| ------------- | ------------------------------------------------------------ |
| `SSH_HOST`    | VPS IP or hostname                                           |
| `SSH_USER`    | `flexyuser`                                                  |
| `SSH_KEY`     | full contents of the **private** `deploy_key` file           |
| `DEPLOY_PATH` | a **dedicated** dir for the app, e.g. `/home/flexyuser/kishanportfolio-app` |

Optional (defaults in parentheses):

| Secret     | Default            | Notes                                  |
| ---------- | ------------------ | -------------------------------------- |
| `SSH_PORT` | `22`               | set only if your SSH port is custom    |
| `PM2_NAME` | `kishanportfolio`  | PM2 process name                       |
| `APP_PORT` | `3003`             | port the app listens on (matches nginx)|

> ⚠️ **`DEPLOY_PATH` must be a fresh directory, not your existing git clone.**
> The sync uses `--delete`, so pointing it at a source checkout would remove
> `.git`/`src`. Use a separate folder that holds only the deployed app + `.env.local`.

### 4. Prepare the deploy directory on the VPS

```bash
# on the VPS, as flexyuser
mkdir -p /home/flexyuser/kishanportfolio-app      # = DEPLOY_PATH
# Put the DB connection string next to where server.js will live.
# (copy from your current app dir, or create it fresh)
nano /home/flexyuser/kishanportfolio-app/.env.local
#   DATABASE_URL=postgres://portfolio_user:REAL_PASSWORD@127.0.0.1:5432/portfolio
```

### 5. Cut over from the current process (do this once, while watching)

Your site currently runs from the old directory via `next start`. Free up
port `APP_PORT` so the new standalone process can bind it:

```bash
# on the VPS — find the current process, then stop it
pm2 list
pm2 delete <current-portfolio-process-name>
```

Then trigger the first deploy by pushing to `main` (or re-run the latest run
from the **Actions** tab). The workflow will see no PM2 process named
`kishanportfolio` and start it: `PORT=3003 pm2 start server.js`.

Nginx needs **no change** — it still proxies `kishanportfolio.tech` → `127.0.0.1:3003`.

---

## After setup

- Push to `main` → it deploys automatically. Watch progress in the **Actions** tab.
- Subsequent deploys just `pm2 reload` (zero-downtime).

## Rollback

The old git-clone directory is left untouched by this pipeline, so if a deploy
misbehaves you can immediately fall back:

```bash
pm2 delete kishanportfolio
cd /home/flexyuser/<old-clone-dir> && PORT=3003 pm2 start npm --name kishanportfolio -- start
```

## Verify a deploy

```bash
curl -I https://kishanportfolio.tech            # 200
pm2 logs kishanportfolio --lines 50             # runtime logs
# submit the contact form once to confirm the DB write still works
```
