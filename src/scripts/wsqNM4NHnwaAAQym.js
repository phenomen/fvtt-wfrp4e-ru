args.applyAP = false;

this.script.scriptNotification(
	"Эта проверка применима только к преступникам. В ином случае закройте окно проверки.",
);
this.actor
	.setupSkill(game.i18n.localize("NAME.Endurance"), {
		fields: { difficulty: "average" },
		skipTargets: true,
		appendTitle: ` - ${this.effect.name}`,
	})
	.then(async (test) => {
		await test.roll();
		if (test.failed) {
			args.actor.addCondition("unconscious");
		}
	});
