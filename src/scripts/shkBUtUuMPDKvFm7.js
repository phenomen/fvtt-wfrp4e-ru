const test = await this.actor.setupSkill("Уклонение", {
	fields: { difficulty: "average" },
});
const caster = this.effect.sourceActor;

const fallen =
	this.effect.sourceTest.result.SL + caster.characteristics.wp.bonus;
await test.roll();
if (test.failed) {
	this.actor.addCondition("prone");
	this.script.scriptMessage(
		`<b>${this.actor.prototypeToken.name}</b> падает на ${fallen} ярдов`,
	);
}
