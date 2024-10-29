const test = await this.actor.setupSkill(game.i18n.localize("NAME.Cool"), {
	fields: { difficulty: "average" },
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
});
await test.roll();
if (test.failed) {
	await this.actor.addCondition("stunned");
	const secondTest = await this.actor.setupSkill(
		game.i18n.localize("NAME.Cool"),
		{
			fields: { difficulty: "easy" },
			skipTargets: true,
			appendTitle: " - отчаяние",
		},
	);
	await secondTest.roll();
	if (secondTest.failed) {
		this.effect.updateSource({ name: "Вкус смерти" });
		await this.actor.addCondition("fatigued");
	} else {
		return false;
	}
}
