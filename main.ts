// news-summary-01 entry (Node 22, standard library only).
//
// The summary of 11 November 2026 is baked into summary.txt beside this
// file. This program just writes that text to entry.txt in the output
// directory. No network, no randomness, no clock: every run writes the
// same bytes.
//
// Run locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const summary = readFileSync(join(here, 'summary.txt'), 'utf8');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The gate takes UTF-8 text of 1 to 2,000 characters that is not only white
// space: refuse to write anything outside it, instead of silently entering
// an invalid file.
const length = [...summary].length;
if (length < 1 || length > 2000 || !/[^\s]/.test(summary)) {
  throw new Error(`summary is ${length} characters, outside the 1-2000 gate`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), summary, 'utf8');
