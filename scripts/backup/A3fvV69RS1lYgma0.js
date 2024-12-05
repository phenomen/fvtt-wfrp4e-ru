if (this.actor.type === "character") this.actor.corruptionDialog("minor");

const test = await this.actor.setupSkill(game.i18n.localize("NAME.Cool"), {
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
});
await test.roll();
if (test.failed) {
	await this.actor.addCondition("unconscious");
	const secondTest = await this.actor.setupSkill(
		game.i18n.localize("NAME.Cool"),
		{
			fields: { difficulty: "easy" },
			skipTargets: true,
			appendTitle: " - Despair",
		},
	);
	await secondTest.roll();
	if (secondTest.failed) {
		await this.actor.addCondition("fatigued");
	}
}
