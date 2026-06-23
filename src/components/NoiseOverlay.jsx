import { useEffect, useRef, memo } from "react";
import "./NoiseOverlay.css";

// ── Noise texture generator ───────────────────────────────────────────
// Creates a 200×200 binary noise PNG as a data URL.
// Runs once on mount (~3ms), then it's pure CSS animation — zero JS per frame.
const TEXTURE_SIZE = 200;

function generateNoiseDataURL() {
  const canvas = document.createElement("canvas");
  canvas.width = TEXTURE_SIZE;
  canvas.height = TEXTURE_SIZE;

  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const imageData = ctx.createImageData(TEXTURE_SIZE, TEXTURE_SIZE);
  const { data } = imageData;

  // Binary noise: each pixel is either black or white
  for (let i = 0; i < data.length; i += 4) {
    const v = Math.random() > 0.5 ? 255 : 0;
    data[i] = v; // R
    data[i + 1] = v; // G
    data[i + 2] = v; // B
    data[i + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL("image/png");
}

// ── Component ─────────────────────────────────────────────────────────
const NoiseOverlay = memo(() => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // One-time: generate noise texture and hand off to CSS
    el.style.backgroundImage = `url(${generateNoiseDataURL()})`;
  }, []);

  return <div ref={ref} className="noise-overlay" />;
});

NoiseOverlay.displayName = "NoiseOverlay";

export default NoiseOverlay;
