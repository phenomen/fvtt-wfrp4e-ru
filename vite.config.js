import { defineConfig } from "vite";
import { readdir } from "node:fs/promises";
import { id } from "./public/module.json";

const config = defineConfig({
	build: {
		outDir: id,
		emptyOutDir: true,
		lib: {
			name: id,
			entry: "src/index.js",
			formats: ["es"],
			sourcemap: false,
		},
		rolldownOptions: {
			output: {
				entryFileNames: "esm/[name].js",
				chunkFileNames: "esm/[name].js",
			},
		},
	},
	plugins: [
		{
			name: "pack-scripts",
			async buildStart() {
				// await translateScripts();
				await packScripts();
			},
		},
	],
});

async function packScripts() {
	// Reference: https://github.com/moo-man/WFRP4e-FoundryVTT/blob/master/scriptPacker.js
	const scripts = await readdir("./scripts/source");
	const scriptObj = {};

	for (const script of scripts) {
		const text = await Bun.file(`./scripts/source/${script}`).text();
		scriptObj[script.split(".")[0]] = text;
	}

	await Bun.write(
		"./src/scripts.js",
		`export function loadScripts() { game.wfrp4e.config.effectScripts = ${JSON.stringify(
			scriptObj
		)}; }`
	);
}

// currently not used
async function translateScripts() {
	let text = await Bun.file("./scripts/packed.js").text();

	localizeMatches.forEach((match, index) => {
		const key = `${placeholder}${index}`;
		placeholderMap.set(key, match);
		text = text.replace(match, key);
	});

	const keys = Object.keys(translation).sort((a, b) => b.length - a.length);
	const pattern = new RegExp(
		keys.map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
		"g"
	);
	text = text.replace(pattern, (match) => translation[match]);

	await Bun.write("./src/scripts.js", text);
}

export default config;
