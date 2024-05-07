const test = await args.actor.setupSkill(game.i18n.localize("NAME.Endurance"), {
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
});
await test.roll();
if (test.failed) {
	const toughnessLost = Number.parseInt(this.effect.sourceTest.result.SL);

	const currentModifier = this.actor.characteristics.t.modifier;

	await this.actor.update({
		"system.characteristics.t.modifier": currentModifier - toughnessLost,
	});
	this.script.scriptMessage(
		`<b>${this.actor.prototypeToken.name}</b> теряет ${toughnessLost} выносливости`,
	);
	if (this.actor.system.characteristics.t.value <= 0) {
		this.actor.addCondition("dead");
	}
}
