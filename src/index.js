import { initTranslation } from "./main.js";
import { patchConfig } from "./config.js";

Hooks.on("init", async () => {
  await initTranslation();
});

Hooks.once("i18nInit", async () => {
  await patchConfig();
});
