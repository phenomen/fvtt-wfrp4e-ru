if (
	args.opposedTest.result.hitloc.value === this.effect.flags.wfrp4e.location
) {
	// e.g. 'head', rLeg, 'lArm'
	this.scriptMessage(
		`Получите состояние @Condition[истекает кровью], когда <strong>${this.item.name}</strong> достигает цели`,
	);
	this.actor.addCondition("blinded");
}
