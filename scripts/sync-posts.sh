#!/usr/bin/env sh
set -eu

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

TMP_FILE="$(mktemp)"

find content -type f -name "*.md" \
  | sed 's#^\./##' \
  | grep -E '^content/[0-9]{4}/[0-9]{2}/[^/]+\.md$' \
  | sed 's#^content/##' \
  | LC_ALL=C sort > "$TMP_FILE"

mkdir -p assets/js

awk 'BEGIN { print "[" }
{
  printf "%s  \"%s\"", (NR == 1 ? "" : ",\n"), $0
}
END {
  if (NR > 0) {
    printf "\n"
  }
  print "]"
}' "$TMP_FILE" > assets/js/posts.json

awk 'BEGIN { print "window.BLOG_POSTS = [" }
{
  printf "%s  \"%s\"", (NR == 1 ? "" : ",\n"), $0
}
END {
  if (NR > 0) {
    printf "\n"
  }
  print "];"
}' "$TMP_FILE" > assets/js/posts.js

rm -f "$TMP_FILE"

echo "Synced assets/js/posts.json and assets/js/posts.js"
