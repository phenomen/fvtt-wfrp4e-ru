const test = await this.actor.setupSkill(game.i18n.localize("NAME.Endurance"), {
	fields: { difficulty: "average" },
	skipTargets: true,
	appendTitle: " - ранен",
});
await test.roll();
if (test.failed) {
	fromUuid("Compendium.wfrp4e-core.items.kKccDTGzWzSXCBOb").then((disease) => {
		this.actor.createEmbeddedDocuments("Item", [disease.toObject()]);
		this.script.scriptNotification(`Получите ${disease.name}`);
	});
}
