import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line roast of a daily gadget, written for the make.fun bounty.
// Revision: the two-sentence draft became one tighter line, and the guard
// now also rejects control characters so the gate sees clean UTF-8 text.
const LINE = "My laptop fan spins up the instant I open a spreadsheet - not to cool the CPU, but to audibly judge my formulas.";

const length = [...LINE].length;
const hasControl = /[\u0000-\u0009\u000b-\u001f\u007f]/.test(LINE);
if (length < 1 || length > 200 || LINE.trim() === "" || hasControl) {
  throw new Error(`entry text invalid: ${length} code points, control=${hasControl}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");
console.log(`wrote ${target} (${length} code points)`);
