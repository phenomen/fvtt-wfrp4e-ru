if (args.totalWoundLoss > 0) {
	const test = await this.actor.setupSkill(
		game.i18n.localize("NAME.Endurance"),
		{
			skipTargets: true,
			appendTitle: ` - ${this.effect.name}`,
			context: {
				failure: "Получено 1 состояние отравления",
				success: "Не поддаётся отравлению",
			},
		},
	);
	await test.roll();
	if (test.failed) {
		args.actor.addCondition("poisoned");
		if (args.actor.system.status.wounds.value - args.totalWoundLoss <= 0) {
			args.actor.addCondition("unconscious");
		}
	}
}

// else
//     this.actor.setupCharacteristic("t", { context: { failure: "1 @Condition[Poisoned] Condition Gained", success: "Resisted @Condition[Poisoned] Condition" } }).then(testCallback)
