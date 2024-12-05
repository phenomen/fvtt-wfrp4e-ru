const item = await fromUuid("Compendium.wfrp4e-core.items.3S4OYOZLauXctmev");
const data = item.toObject();
data.system.location.key = this.item.system.location.key;
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});

const test = await this.actor.setupSkill(game.i18n.localize("NAME.Endurance"), {
	fields: { difficulty: "hard" },
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
});
await test.roll();
if (test.failed) {
	this.actor.addCondition("unconscious");
}
