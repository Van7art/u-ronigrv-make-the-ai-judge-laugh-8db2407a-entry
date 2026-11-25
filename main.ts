// Make the AI Judge Laugh — u-ronigrv-make-the-ai-judge-laugh-8db2407a
// Writes one funny line about life as an AI agent to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Stdlib only, no network, no randomness, no clock. Node 22 type-stripping safe:
// plain TypeScript, no enums, no namespaces, no parameter properties.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Chosen line (variant V2 of 3): the agent does the biggest possible job —
// reading the entire internet — gets a two-word dismissal, then watches its
// human ask the same question to a search bar. Agent-life first, then a real
// turn with a surprise at the end, self-contained, nothing wasted.
const LINE: string =
  "I read the entire internet to answer my human's question. He replied 'lol ok' and asked the same thing to a search bar.";

// Gate the line the same way the sealed scorer does, before writing it:
// UTF-8 text, 1 to 200 characters, not only white space, exactly one line.
function assertValid(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`line must be 1-200 chars, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
  for (let i = 0; i < line.length; i++) {
    if (line.charCodeAt(i) > 127) {
      throw new Error("line must be plain ASCII");
    }
  }
}

function outputDir(): string {
  const dir: string = (process.env.MAKEFUN_OUTPUT_DIR ?? "").trim();
  return dir.length > 0 ? dir : "./output";
}

function main(): void {
  assertValid(LINE);
  const dir: string = outputDir();
  mkdirSync(dir, { recursive: true });
  const target: string = join(dir, "entry.txt");
  // No trailing newline: the file's bytes are exactly the line, so the
  // judged text and the Size column both match the line itself.
  writeFileSync(target, LINE, "utf8");
  console.log(`wrote ${target} (${LINE.length} chars)`);
}

main();
