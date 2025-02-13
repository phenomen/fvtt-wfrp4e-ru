import { patchConfigReady, patchConfigSetup } from "./config.js";
import { initTranslation } from "./main.js";

Hooks.on("init", () => {
	initTranslation();
});

Hooks.once("ready", () => {
	patchConfigReady();
});

Hooks.once("setup", () => {
	patchConfigSetup();
});
