const test = await this.actor.setupSkill(game.i18n.localize("NAME.Endurance"), {
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
	fields: { difficulty: "veasy" },
});
await test.roll();
if (test.failed) {
	this.script.scriptNotification("Получите <strong>нагноение</strong>");
	const item = await fromUuid("Compendium.wfrp4e-core.items.kKccDTGzWzSXCBOb");
	this.actor.createEmbeddedDocuments("Item", [item.toObject()]);
} else {
	this.script.scriptNotification("Предотвращено <strong>нагноение</strong>");
}
