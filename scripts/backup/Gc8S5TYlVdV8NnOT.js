const test = await args.actor.setupSkill(game.i18n.localize("NAME.Cool"), {
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
	context: {
		failure: "Впадает в панику",
		success: "Не поддаётся панике",
	},
});

await test.roll();

if (!test.succeeded) {
	args.actor.addCondition("broken");
}
