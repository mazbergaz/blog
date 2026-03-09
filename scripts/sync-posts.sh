#!/usr/bin/env sh
set -eu

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

DISCOVERED="$(mktemp)"
EXISTING="$(mktemp)"
FINAL="$(mktemp)"

find content -type f -name "*.md" \
  | sed 's#^\./##' \
  | grep -E '^content/[0-9]{4}/[0-9]{2}/[^/]+\.md$' \
  | sed 's#^content/##' \
  | LC_ALL=C sort > "$DISCOVERED"

if [ -f assets/js/posts.json ]; then
  grep -Eo '"[0-9]{4}/[0-9]{2}/[^"/]+\.md"' assets/js/posts.json \
    | sed 's/^"//; s/"$//' \
    | LC_ALL=C sed '/^$/d' > "$EXISTING"
elif [ -f assets/js/posts.js ]; then
  grep -Eo '"[0-9]{4}/[0-9]{2}/[^"/]+\.md"' assets/js/posts.js \
    | sed 's/^"//; s/"$//' \
    | LC_ALL=C sed '/^$/d' > "$EXISTING"
else
  : > "$EXISTING"
fi

# Keep current order for existing items that still exist.
while IFS= read -r item; do
  if grep -Fxq "$item" "$DISCOVERED"; then
    printf '%s\n' "$item" >> "$FINAL"
  fi
done < "$EXISTING"

# Append only new items at the bottom (deterministic by lexical order from DISCOVERED).
while IFS= read -r item; do
  if ! grep -Fxq "$item" "$FINAL"; then
    printf '%s\n' "$item" >> "$FINAL"
  fi
done < "$DISCOVERED"

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
}' "$FINAL" > assets/js/posts.json

awk 'BEGIN { print "window.BLOG_POSTS = [" }
{
  printf "%s  \"%s\"", (NR == 1 ? "" : ",\n"), $0
}
END {
  if (NR > 0) {
    printf "\n"
  }
  print "];"
}' "$FINAL" > assets/js/posts.js

rm -f "$DISCOVERED" "$EXISTING" "$FINAL"

echo "Synced assets/js/posts.json and assets/js/posts.js"
