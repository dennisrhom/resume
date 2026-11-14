#!/usr/bin/env bash
# Re-encode a phone video for the web: H.264, max 1080p, no audio, small file,
# plus a poster frame. Requires ffmpeg (sudo apt-get install -y ffmpeg).
#
#   npm run video -- path/to/BlastXPhantom_Shooting_Video.MP4 [output-name]
#
# Output goes to public/media/video/<output-name>.mp4 and -poster.jpg.
# The script prints the object to paste into content/projects.ts.
set -euo pipefail

SRC="${1:?Usage: npm run video -- path/to/video.mp4 [output-name]}"
NAME="${2:-blastx-phantom-firing}"
OUT="public/media/video"
command -v ffmpeg >/dev/null || { echo "ffmpeg is not installed. Run: sudo apt-get install -y ffmpeg"; exit 1; }
mkdir -p "$OUT"

# Scale so the long side is at most 1920 and the short side at most 1080, keep aspect, even dimensions.
VF="scale='if(gt(iw,ih),min(1920,iw),-2)':'if(gt(iw,ih),-2,min(1920,ih))',format=yuv420p"

ffmpeg -y -i "$SRC" -an -vf "$VF" -c:v libx264 -preset slow -crf 27 -maxrate 2500k -bufsize 5000k \
  -profile:v high -movflags +faststart -map_metadata -1 "$OUT/$NAME.mp4"
ffmpeg -y -ss 0.5 -i "$OUT/$NAME.mp4" -frames:v 1 -q:v 4 "$OUT/$NAME-poster.jpg"

SIZE=$(du -h "$OUT/$NAME.mp4" | cut -f1)
DIMS=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=x "$OUT/$NAME.mp4")
W="${DIMS%x*}"; H="${DIMS#*x}"
echo
echo "Wrote $OUT/$NAME.mp4 ($SIZE, ${W}x${H}). If it is over 5 MB, raise -crf to 29 or 30 and run again."
echo "Paste this into content/projects.ts in place of null:"
echo
echo "  { src: \"/media/video/$NAME.mp4\", poster: \"/media/video/$NAME-poster.jpg\", width: $W, height: $H, caption: \"Firing test.\" }"
