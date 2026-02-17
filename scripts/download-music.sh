#!/usr/bin/env bash
set -euo pipefail

# Download music assets from shared Google Drive folder.
#
# Prerequisites:
#   pip install gdown
#
# Usage:
#   pnpm run download-music

MUSIC_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/music"
GDRIVE_FOLDER_ID="1wFzYYWJjFUrQEHdq0U_qsjpEXBFjuY_l"
GDRIVE_URL="https://drive.google.com/drive/folders/${GDRIVE_FOLDER_ID}"

mkdir -p "$MUSIC_DIR"

# Find gdown: prefer PATH, fall back to python3 -m gdown
if command -v gdown &>/dev/null; then
  GDOWN="gdown"
elif python3 -m gdown --version &>/dev/null 2>&1; then
  GDOWN="python3 -m gdown"
else
  echo "gdown is not installed."
  echo ""
  echo "Install it with:  pip3 install gdown"
  echo ""
  echo "Or download music manually from:"
  echo "  $GDRIVE_URL"
  echo ""
  echo "Place MP3 files in: $MUSIC_DIR"
  exit 1
fi

echo "Downloading music to $MUSIC_DIR ..."
$GDOWN --folder "$GDRIVE_URL" -O "$MUSIC_DIR" --remaining-ok

echo ""
echo "Done. Files in $MUSIC_DIR:"
ls -la "$MUSIC_DIR"/*.mp3 2>/dev/null || echo "  (no MP3 files found)"
