if (args.totalWoundLoss >= 1) {
	const test = await args.actor.setupSkill(
		game.i18n.localize("NAME.Endurance"),
		{
			skipTargets: true,
			appendTitle: ` - ${this.effect.name}`,
			context: {
				failure: "Gained a Poisoned Condition",
				success: "Resisted the poison",
			},
		},
	);
	await test.roll();
	if (test.failed) {
		args.actor.addCondition("poisoned");
	}
}
