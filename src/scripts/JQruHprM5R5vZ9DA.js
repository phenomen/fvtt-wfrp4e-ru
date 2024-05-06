const caster = this.effect.sourceActor;
if (caster) {
	const healed =
		caster.system.characteristics.wp.bonus +
		caster.system.characteristics.int.bonus;
	await this.actor.modifyWounds(healed);
	this.script.scriptMessage(
		`<strong>${this.actor.prototypeToken.name}</strong> regains ${healed} Wounds`,
	);
}

const test = await this.actor.setupSkill(game.i18n.localize("NAME.Endurance"), {
	fields: { difficulty: "vhard" },
	context: {
		success:
			"1 Corruption point that was gained within the last hour is removed.",
		failure: "Nothing happens",
	},
});
await test.roll();
