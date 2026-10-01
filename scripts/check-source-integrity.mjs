import { readFile, readdir, stat } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import process from "node:process";

const root = process.cwd();
const ignored = new Set([".git", "dist", "node_modules"]);
const sourceExtensions = new Set([".js", ".cjs", ".mjs", ".ts", ".tsx", ".json", ".yml", ".yaml"]);
const suspicious = [
  /String\.fromCharCode\s*\(/,
  /global\s*\[[^\]]+\]\s*=/,
  /\beval\s*\(/,
  /new\s+Function\s*\(/,
  /child_process/,
  /https?\.(?:get|request)\s*\(/,
];

const failures = [];

const visit = async (directory) => {
  for (const entry of await readdir(directory)) {
    if (ignored.has(entry)) continue;
    if (entry === "check-source-integrity.mjs" && directory.endsWith("/scripts")) continue;
    const absolute = join(directory, entry);
    const details = await stat(absolute);
    if (details.isDirectory()) {
      await visit(absolute);
      continue;
    }
    if (!sourceExtensions.has(extname(entry))) continue;
    const source = await readFile(absolute, "utf8");
    const lines = source.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (line.length > 2000) failures.push(`${relative(root, absolute)}:${index + 1} contains an unusually long source line (${line.length} characters)`);
      suspicious.forEach((pattern) => {
        if (pattern.test(line)) failures.push(`${relative(root, absolute)}:${index + 1} matches blocked pattern ${pattern}`);
      });
    });
  }
};

await visit(root);

if (failures.length) {
  console.error("Source-integrity check failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Source-integrity check passed.");
