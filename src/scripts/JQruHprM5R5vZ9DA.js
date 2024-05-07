const caster = this.effect.sourceActor;
if (caster) {
	const healed =
		caster.system.characteristics.wp.bonus +
		caster.system.characteristics.int.bonus;
	await this.actor.modifyWounds(healed);
	this.script.scriptMessage(
		`<strong>${this.actor.prototypeToken.name}</strong> восстанавливает пункты здоровья: ${healed}`,
	);
}

const test = await this.actor.setupSkill(game.i18n.localize("NAME.Endurance"), {
	fields: { difficulty: "vhard" },
	context: {
		success:
			"Удален 1 пункт скверны, полученный в течение последнего часа.",
		failure: "Ничего не происходит.",
	},
});
await test.roll();
