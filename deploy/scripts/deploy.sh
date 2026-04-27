#!/usr/bin/env bash
# Deploy script for Falahub (run as user `falahub` on the VPS).
#
# Layout:
#   /srv/falahub/repo       — git checkout (origin = GitHub)
#   /srv/falahub/releases/  — timestamped build artifacts
#   /srv/falahub/current    — symlink to the active release
#   /srv/falahub/shared/.env — environment file (kept across deploys)
set -euo pipefail

ROOT=/srv/falahub
REPO="$ROOT/repo"
RELEASES="$ROOT/releases"
SHARED="$ROOT/shared"
CURRENT="$ROOT/current"
BRANCH="${DEPLOY_BRANCH:-main}"

if [ ! -f "$SHARED/.env" ]; then
    echo "missing $SHARED/.env" >&2
    exit 1
fi

mkdir -p "$RELEASES"

echo "==> fetching $BRANCH"
git -C "$REPO" fetch --depth=1 origin "$BRANCH"
git -C "$REPO" reset --hard "origin/$BRANCH"

TS=$(date -u +%Y%m%d%H%M%S)
REL="$RELEASES/$TS"
mkdir -p "$REL"
git -C "$REPO" archive HEAD | tar -x -C "$REL"

ln -sfn "$SHARED/.env" "$REL/.env"

echo "==> installing deps"
cd "$REL"
npm ci --no-audit --no-fund

echo "==> building"
npm run build

# Next standalone output: assemble a self-contained release directory.
# After `next build` with output:'standalone', .next/standalone/ contains
# server.js + minimal node_modules. Static assets must be copied in.
echo "==> assembling standalone"
cp -a .next/standalone/. ./.next-standalone/
cp -a .next/static       ./.next-standalone/.next/static
if [ -d public ]; then cp -a public ./.next-standalone/public; fi
ln -sfn "$SHARED/.env" "$REL/.next-standalone/.env"

echo "==> activating release $TS"
ln -sfn "$REL/.next-standalone" "$CURRENT"
sudo systemctl restart falahub-app

echo "==> healthcheck"
for _ in 1 2 3 4 5 6 7 8 9 10; do
    if curl -fsS http://127.0.0.1:3000/healthz >/dev/null; then
        echo "deploy ok ($TS)"
        break
    fi
    sleep 1
done

echo "==> pruning old releases"
ls -1dt "$RELEASES"/*/ | tail -n +6 | xargs -r rm -rf
