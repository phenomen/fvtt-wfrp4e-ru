await this.actor.addCondition("stunned");
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

const location = this.item.system.location.key;

if (location) {
	const dropped = this.item.system.weaponsAtLocation;

	if (dropped.length) {
		this.script.scriptNotification(
			`Dropped ${dropped.map((i) => i.name).join(", ")}!`,
		);
		for (const weapon of dropped) {
			await weapon.system.toggleEquip();
		}
	}
}
