#!/usr/bin/env bash
set -euo pipefail

# instagram_downloader.sh
# Downloads reels/media from a public Instagram profile using yt-dlp.
# Usage: ./instagram_downloader.sh [INSTAGRAM_PROFILE_URL]

OUT_DIR="$(dirname "$0")/../public/instagram_reels"
PROFILE_URL=${1:-"https://www.instagram.com/trishul_gmg/"}
YT_DLP=${YT_DLP:-yt-dlp}

mkdir -p "$OUT_DIR"

if ! command -v "$YT_DLP" >/dev/null 2>&1; then
  echo "yt-dlp not found. Install with: python3 -m pip install --user yt-dlp"
  exit 1
fi

echo "Downloading from: $PROFILE_URL"
echo "Output directory: $OUT_DIR"

# Download videos, thumbnails, and metadata. Use upload date + id for filenames.
"$YT_DLP" -f best --no-mtime \
  -o "$OUT_DIR/%(upload_date)s_%(id)s.%(ext)s" \
  --write-thumbnail --write-description --write-info-json --write-all-thumbnails \
  --yes-playlist \
  "$PROFILE_URL"

echo "Generating summary CSV from info JSON files..."

OUT_DIR="$OUT_DIR" python3 - <<'PY'
import csv, json, os, pathlib
out = pathlib.Path(os.environ["OUT_DIR"])
csv_path = out / "instagram_reels_summary.csv"
fields = ["filename","id","upload_date","uploader","title","description","webpage_url"]
rows = []
for p in out.glob("*.info.json"):
    try:
        data = json.loads(p.read_text(encoding='utf-8'))
    except Exception:
        continue
    filename = p.name.replace('.info.json', '')
    rows.append({
        "filename": filename,
        "id": data.get('id',''),
        "upload_date": data.get('upload_date',''),
        "uploader": data.get('uploader',''),
        "title": data.get('title','') or data.get('alt_title',''),
        "description": data.get('description','') or '',
        "webpage_url": data.get('webpage_url','')
    })
if rows:
    with open(csv_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()
        for r in rows:
            writer.writerow(r)
    print('Wrote summary to', csv_path)
else:
    print('No info JSON files found; no summary produced.')
PY

echo "Done. Files are in: $OUT_DIR"
