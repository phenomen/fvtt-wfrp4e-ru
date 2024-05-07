const caster = this.effect.sourceActor;

if (caster) {
	const bonus = caster.system.characteristics.wp.bonus;
	this.actor.modifyWounds(bonus);

	this.script.scriptMessage(
		`<strong>${this.actor.prototypeToken.name}</strong> регенерирует ${bonus} пунктов здоровья`,
	);
}
