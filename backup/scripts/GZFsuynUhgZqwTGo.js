if (args.totalWoundLoss >= 1) {
	const test = await args.actor.setupSkill(
		game.i18n.localize("NAME.Endurance"),
		{
			skipTargets: true,
			appendTitle: ` - ${this.effect.name}`,
			context: {
				failure: "Получите состояние отравления",
				success: "Не поддается яду",
			},
		},
	);
	await test.roll();
	if (test.failed) {
		args.actor.addCondition("poisoned");
	}
}
