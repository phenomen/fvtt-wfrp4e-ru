const test = await this.actor.setupSkill("Dodge", {
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
});
await test.roll();

if (test.failed) {
	await this.actor.addCondition("grappling");
}
