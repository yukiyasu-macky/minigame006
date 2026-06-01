import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const outdir = join(process.cwd(), "tmp", "simulation-tests");
const outfile = join(outdir, "simulation-tests.mjs");

await rm(outdir, { recursive: true, force: true });
await mkdir(outdir, { recursive: true });

await build({
  entryPoints: [join(process.cwd(), "scripts", "simulation-tests.ts")],
  outfile,
  bundle: true,
  platform: "node",
  format: "esm",
  sourcemap: "inline",
  logLevel: "silent",
});

await import(pathToFileURL(outfile).href);
