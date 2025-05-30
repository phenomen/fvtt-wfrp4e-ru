import { patchConfig } from "./config.js";
import { initTranslation } from "./main.js";

Hooks.on("init", async () => {
	await initTranslation();
});

Hooks.once("i18nInit", async () => {
	await patchConfig();
});
