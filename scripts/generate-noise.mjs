/**
 * Generates a 200×200 binary noise PNG for the CSS grain overlay.
 * Run once: `node scripts/generate-noise.mjs`
 * Output:   public/noise.png (~2KB)
 */
import { createCanvas } from "canvas";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SIZE = 200;

const canvas = createCanvas(SIZE, SIZE);
const ctx = canvas.getContext("2d");
const imageData = ctx.createImageData(SIZE, SIZE);
const data = imageData.data;

for (let i = 0; i < data.length; i += 4) {
  const v = Math.random() > 0.5 ? 255 : 0;
  data[i] = v;
  data[i + 1] = v;
  data[i + 2] = v;
  data[i + 3] = 255;
}

ctx.putImageData(imageData, 0, 0);

const outPath = resolve(__dirname, "..", "public", "noise.png");
const buffer = canvas.toBuffer("image/png");
writeFileSync(outPath, buffer);
console.log(`✓ Noise texture written to ${outPath} (${buffer.byteLength} bytes)`);
