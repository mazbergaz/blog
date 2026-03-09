#!/usr/bin/env sh
set -eu

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

fingerprint() {
  find content -type f -name "*.md" \
    | sed 's#^\./##' \
    | grep -E '^content/[0-9]{4}/[0-9]{2}/[^/]+\.md$' \
    | LC_ALL=C sort \
    | while IFS= read -r file; do
        if [ -f "$file" ]; then
          printf '%s:%s\n' "$file" "$(stat -f '%m' "$file")"
        fi
      done \
    | shasum \
    | awk '{print $1}'
}

last="$(fingerprint || true)"

# Initial sync
./scripts/sync-posts.sh

echo "Watching content/<year>/<month>/*.md for changes..."
while :; do
  sleep 1
  current="$(fingerprint || true)"
  if [ "$current" != "$last" ]; then
    ./scripts/sync-posts.sh
    last="$current"
  fi
done
