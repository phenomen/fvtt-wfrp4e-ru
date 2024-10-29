const test = await args.actor.setupSkill(game.i18n.localize("NAME.Cool"), {
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
});
await test.roll();

if (test.succeeded) {
	if (args.totalWoundLoss <= Number.parseInt(test.result.SL)) {
		args.abort = `<strong>${this.effect.name}</strong>: Атака отклонена и отражена`;
	}
	args.modifiers.other.push({
		label: this.effect.name,
		value: -1 * Number.parseInt(test.result.SL),
	});
}
