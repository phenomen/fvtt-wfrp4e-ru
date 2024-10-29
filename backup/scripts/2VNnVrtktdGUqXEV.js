if (args.totalWoundLoss > 0) {
	const test = await args.actor.setupSkill(
		game.i18n.localize("NAME.Endurance"),
		{ skipTargets: true, appendTitle: ` - ${this.effect.name}` },
	);
	await test.roll();
	if (
		test.failed &&
		Number.parseInt(args.opposedTest.attackerTest.result.SL) > 0
	) {
		args.actor.addCondition(
			"stunned",
			Number.parseInt(args.opposedTest.attackerTest.result.SL),
		);
	}
}
