const item = await fromUuid("Compendium.wfrp4e-core.items.zyocWSzEZEC826NS");
const data = item.toObject();
data.system.location.key = this.item.system.location.key;
this.actor.createEmbeddedDocuments("Item", [data]);

const test = await this.actor.setupSkill(game.i18n.localize("NAME.Endurance"), {
	fields: { difficulty: "hard" },
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
});
await test.roll();
if (test.failed) {
	await this.actor.addCondition("prone");
	await this.actor.addCondition("stunned");
}
