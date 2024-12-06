import { cp, rm, mkdir, readdir } from "node:fs/promises";
import { id } from "./public/module.json";
import { translation } from "./scripts/translation.js";

async function main() {
	console.log("-- PACKING SCRIPTS...");
	await packScripts();

	console.log("-- TRANSLATING SCRIPTS...");
	await translateScripts();

	console.log("-- BUILDING SOURCE...");
	await buildSource(id);

	console.log("-- COPYING STATIC FILES...");
	await copyDirectory("./public", `./${id}`);

	console.log("-- DONE!");
}

async function buildSource(id: string) {
	const result = await Bun.build({
		entrypoints: ["./src/index.js"],
		format: "esm",
		outdir: `./${id}`,
		publicPath: `/modules/${id}/`,
		minify: true,
		splitting: false,
		sourcemap: "none",
	});

	if (!result.success) {
		throw new AggregateError(result.logs, "Build failed");
	}
}

async function packScripts() {
	const scripts = await readdir("./scripts/source");
	const scriptObj: { [key: string]: string } = {};

	for (const script of scripts) {
		const text = await Bun.file(`./scripts/source/${script}`).text();
		scriptObj[script.split(".")[0]] = text;
	}

	const scriptLoader = `export function loadScripts()
	{	
		game.wfrp4e.config.effectScripts = ${JSON.stringify(scriptObj)};	
	}`;

	await Bun.write("./scripts/packed.js", scriptLoader);
}

async function translateScripts() {
	let text = await Bun.file(`./scripts/packed.js`).text();

	const localizePattern = /game\.i18n\.localize\([^)]+\)/g;
	const localizeMatches = text.match(localizePattern) || [];
	const placeholder = "___LOCALIZE_PLACEHOLDER___";
	let placeholderMap = new Map();

	localizeMatches.forEach((match, index) => {
		const key = `${placeholder}${index}`;
		placeholderMap.set(key, match);
		text = text.replace(match, key);
	});

	const keys = Object.keys(translation).sort((a, b) => b.length - a.length);
	const pattern = new RegExp(
		keys.map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
		"g",
	);
	text = text.replace(pattern, (match) => translation[match as keyof typeof translation]);

	placeholderMap.forEach((value, key) => {
		text = text.replace(key, value);
	});

	await Bun.write("./src/scripts.js", text);
}

async function copyDirectory(src: string, dest: string) {
	await mkdir(dest, { recursive: true });
	await cp(src, dest, { recursive: true, force: true });
}

await main();
