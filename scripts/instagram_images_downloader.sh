#!/usr/bin/env bash
set -euo pipefail

# instagram_images_downloader.sh
# Downloads only image posts from a public Instagram profile using yt-dlp.
# Usage: ./instagram_images_downloader.sh [INSTAGRAM_PROFILE_URL]

OUT_DIR="$(dirname "$0")/../public/instagram_reels"
PROFILE_URL=${1:-"https://www.instagram.com/trishul_gmg/"}
YT_DLP=${YT_DLP:-yt-dlp}

mkdir -p "$OUT_DIR"

if ! command -v "$YT_DLP" >/dev/null 2>&1; then
  echo "yt-dlp not found. Install with: python3 -m pip install --user yt-dlp or install standalone binary"
  exit 1
fi

echo "Downloading images from: $PROFILE_URL"
echo "Output directory: $OUT_DIR"

# Match only non-video items (images/carousels). This uses yt-dlp's info dict field `is_video`.
"$YT_DLP" --match-filter "is_video is False" --no-mtime \
  -o "$OUT_DIR/%(upload_date)s_%(id)s.%(ext)s" \
  --write-info-json --write-thumbnail --write-all-thumbnails \
  --yes-playlist \
  "$PROFILE_URL"

echo "Summary generation (if any info JSON files exist)"

OUT_DIR="$OUT_DIR" python3 - <<'PY'
import csv, json, os, pathlib
out = pathlib.Path(os.environ["OUT_DIR"])
csv_path = out / "instagram_images_summary.csv"
fields = ["filename","id","upload_date","uploader","title","description","webpage_url"]
rows = []
for p in out.glob("*.info.json"):
    try:
        data = json.loads(p.read_text(encoding='utf-8'))
    except Exception:
        continue
    # only include non-video entries
    if data.get('is_video'):
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
    print('No image info JSON files found; no summary produced.')
PY

echo "Done. Image files (if any) are in: $OUT_DIR"
