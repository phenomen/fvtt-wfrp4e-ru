import { cp, mkdir, readdir } from "node:fs/promises";
import { id } from "./public/module.json";

async function main() {
	console.log("-- BUILDING SOURCE...");
	await buildSource(id);

	console.log("-- COPYING STATIC FILES...");
	await copyDirectory("./public", `./${id}`);
}

async function buildSource(id: string) {
	await packScripts();

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
	const scripts = await readdir("./src/scripts");
	const scriptObj: { [key: string]: string } = {};

	for (const script of scripts) {
		const text = await Bun.file(`./src/scripts/${script}`).text();
		scriptObj[script.split(".")[0]] = text;
	}

	const scriptLoader = `export function loadScripts()
	{	
		game.wfrp4e.config.effectScripts = ${JSON.stringify(scriptObj)};	
	}`;

	console.log("-- PACKING SCRIPTS...");
	await Bun.write("./src/scripts.js", scriptLoader);
}

async function copyDirectory(src: string, dest: string) {
	await mkdir(dest, { recursive: true });
	await cp(src, dest, { recursive: true, force: true });
}

await main();
