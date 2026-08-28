Instagram reels downloader
=========================

This repository includes `scripts/instagram_downloader.sh` to download public Instagram reels/media using `yt-dlp`.

Requirements
- `python3`
- `yt-dlp` (install with `python3 -m pip install --user yt-dlp`)

Usage
------
Make the script executable and run it (defaults to the `trishul_gmg` profile):

```bash
chmod +x scripts/instagram_downloader.sh
scripts/instagram_downloader.sh
# or pass a different profile URL:
scripts/instagram_downloader.sh https://www.instagram.com/other_profile/
```

Output
- Files are saved to `public/instagram_reels`.
- A CSV summary `instagram_reels_summary.csv` will be produced when info JSON files exist.

Notes
- Ensure you have permission to download and reuse content from the target account.
- Private accounts or content requiring login may need cookies/auth; consult `yt-dlp` docs.

Images-only
-----------
If you want to download only image posts (no videos), use the images-only script:

```bash
chmod +x scripts/instagram_images_downloader.sh
YT_DLP=~/.local/bin/yt-dlp ./scripts/instagram_images_downloader.sh
# or pass an explicit profile URL:
YT_DLP=~/.local/bin/yt-dlp ./scripts/instagram_images_downloader.sh https://www.instagram.com/trishul_gmg/
```

This script uses `yt-dlp --match-filter "is_video is False"` to skip video posts and generates `instagram_images_summary.csv` when possible.
