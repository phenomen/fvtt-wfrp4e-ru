this.script.scriptMessage(
	await this.actor.applyBasicDamage(
		8 + Number.parseInt(this.effect.sourceTest.result.SL),
		{ suppressMsg: true },
	),
);

const test = await this.actor.setupSkill("Атлетика", {
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
});
await test.roll();
if (test.failed) {
	this.actor.addCondition("prone");
}
