import { cp, mkdir, readdir } from "node:fs/promises";
import { parseArgs } from "node:util";
import manifest from "./public/module.json";

interface BuildOptions {
	id: string;
	bump?: string;
}

async function main() {
	const options = parseCommandLineArgs();

	console.log("-- BUILDING SOURCE...");
	await buildSource(options.id);

	if (options.bump) {
		console.log("-- BUMPING VERSION...");
		await bumpVersion(options.bump);
	}

	console.log("-- COPYING STATIC FILES...");
	await copyDirectory("./public", `./${options.id}`);
}

function parseCommandLineArgs(): BuildOptions {
	const { values } = parseArgs({
		args: Bun.argv,
		options: {
			id: { type: "string" },
			bump: { type: "string" },
		},
		strict: true,
		allowPositionals: true,
	});

	if (!values.id) {
		throw new Error("Missing required option: --id");
	}

	return values as BuildOptions;
}

async function buildSource(id: string) {
	await packScripts();

	await Bun.build({
		entrypoints: ["./src/index.js"],
		format: "esm",
		outdir: `./${id}`,
		publicPath: `/modules/${id}/`,
		minify: true,
		splitting: false,
		sourcemap: "none",
	}).catch((e) => {
		console.error(e);
	});
}

async function packScripts() {
	const scripts = await readdir("./src/scripts");
	const scriptObj = {};

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

async function bumpVersion(mode: string) {
	const version = manifest.version;
	const versionFiles = ["./public/module.json", "./README.md"];
	const [major, minor, patch] = version.split(".");

	let newVersion: string;
	switch (mode) {
		case "major":
			newVersion = `${Number.parseInt(major) + 1}.0.0`;
			break;
		case "minor":
			newVersion = `${major}.${Number.parseInt(minor) + 1}.0`;
			break;
		case "patch":
			newVersion = `${major}.${minor}.${Number.parseInt(patch) + 1}`;
			break;
		default:
			throw new Error(`Invalid bump mode: ${mode}`);
	}

	for (const file of versionFiles) {
		const text = await Bun.file(file).text();
		const bumped = text.replace(version, newVersion);
		await Bun.write(file, bumped);
	}
}

await main();
