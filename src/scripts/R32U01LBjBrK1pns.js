const templateMap = {
	P2e7Yx98bK3u110a: "",
	iuMp3KLaMT2WCmie: "Xp4r2KUhqfjak8zq",
	RBuYcT5tppwcmnC5: "wYN19h3WVF1yOVq2",
	vcGpNwNbhvfzVveQ: "ac5ClOuaYtzOYyWp",
	jmhKZy0w9TzkEK9c: "IS3LTdTuay6uRHUq",
	"9Byj6k7SmdTYis2V": "LjMlx99gBGeRJUQu",
	laJwc2l9tzJPgaaJ: "x5wpMprsObuqMCYg",
};
const template = (
	await game.wfrp4e.tables.rollTable("hireling-templates", { hideDSN: true })
).object;
const physicalQuirk = (
	await game.wfrp4e.tables.rollTable("physical-quirks", { hideDSN: true })
).text;
const workEthic = (
	await game.wfrp4e.tables.rollTable("work-ethic", { hideDSN: true })
).text;
const personalityQuirk = (
	await game.wfrp4e.tables.rollTable("personality-quirks", { hideDSN: true })
).text;

const templateItem = await game.wfrp4e.utility.findItemId(
	templateMap[template._id],
);

const bio = `
        <p><strong>Шаблон</strong>: ${template.text}</p>
        <p><strong>Физические особенности</strong>: ${physicalQuirk}</p>
        <p><strong>Отношение к работе</strong>: ${workEthic}</p>
        <p><strong>Особенности личности</strong>: ${personalityQuirk}</p>
        `;

this.script.scriptMessage(bio, {
	whisper: ChatMessage.getWhisperRecipients("GM"),
});

await this.actor.update({ "system.details.gmnotes.value": bio });

if (templateItem) {
	this.actor.createEmbeddedDocuments("Item", [templateItem.toObject()]);
}
