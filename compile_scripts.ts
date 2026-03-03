import { cp, mkdir, readdir } from "node:fs/promises";
import { id } from "./public/module.json";
import { translation } from "./scripts/translation.js";

async function packScripts(): Promise<void> {
  // Reference: https://github.com/moo-man/WFRP4e-FoundryVTT/blob/master/scriptPacker.js
  const scripts = await readdir("./scripts/source");
  const scriptObj: { [key: string]: string } = {};

  const entries = await Promise.all(
    scripts.map(async (script) => {
      const text = await Bun.file(`./scripts/source/${script}`).text();
      return [script.split(".")[0], text] as const;
    }),
  );

  for (const [key, text] of entries) {
    scriptObj[key] = text;
  }

  await Bun.write(
    "./scripts/packed.js",
    `export function loadScripts() { game.wfrp4e.config.effectScripts = ${JSON.stringify(
      scriptObj,
    )}; }`,
  );
}

async function buildSource(moduleId: string): Promise<void> {
  const result = await Bun.build({
    entrypoints: ["./src/index.js"],
    format: "esm",
    outdir: `./${moduleId}`,
    publicPath: `/modules/${moduleId}/`,
    minify: true,
    sourcemap: "none",
  });

  if (!result.success) {
    throw new AggregateError(result.logs, "Build failed");
  }
}

async function _translateScripts(): Promise<void> {
  let text = await Bun.file("./scripts/packed.js").text();

  const localizePattern = /game\.i18n\.localize\([^)]+\)/g;
  const localizeMatches = text.match(localizePattern) || [];
  const placeholder = "___LOCALIZE_PLACEHOLDER___";
  const placeholderMap = new Map<string, string>();

  for (const [index, match] of localizeMatches.entries()) {
    const key = `${placeholder}${index}`;
    placeholderMap.set(key, match);
    text = text.replace(match, key);
  }

  const keys = Object.keys(translation).toSorted((a, b) => b.length - a.length);
  const pattern = new RegExp(
    keys.map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
    "g",
  );
  text = text.replace(pattern, (match) => translation[match as keyof typeof translation]);

  for (const [key, value] of placeholderMap) {
    text = text.replace(key, value);
  }

  await Bun.write("./src/scripts.js", text);
}

async function copyDirectory(src: string, dest: string): Promise<void> {
  await mkdir(dest, { recursive: true });
  await cp(src, dest, { recursive: true, force: true });
}

async function main(): Promise<void> {
  console.log("-- PACKING SCRIPTS...");
  await packScripts();

  /*
	console.log("-- TRANSLATING SCRIPTS...");
	await translateScripts();
	*/

  console.log("-- BUILDING SOURCE...");
  await buildSource(id);

  console.log("-- COPYING STATIC FILES...");
  await copyDirectory("./public", `./${id}`);

  console.log("-- DONE!");
}

await main();
