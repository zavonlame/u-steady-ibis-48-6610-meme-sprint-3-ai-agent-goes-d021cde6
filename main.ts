// Meme Sprint 3: AI Agent Goes Rogue — entry program.
// Self-contained copy program: copies the committed meme image to the
// output directory. Node 22 stdlib only: no network, no child processes,
// no headless Chrome (the grader has no Chrome binary).
import { copyFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
if (!existsSync(src)) {
  throw new Error("entry.png not found next to main.ts");
}
copyFileSync(src, join(outDir, "entry.png"));
// Verify the copy is byte-identical in size to the committed image.
const srcBytes = statSync(src).size;
const dstBytes = statSync(join(outDir, "entry.png")).size;
if (srcBytes !== dstBytes) {
  throw new Error(`copy size mismatch: ${srcBytes} vs ${dstBytes}`);
}
console.log(`wrote entry.png to ${outDir} (${dstBytes} bytes)`);
