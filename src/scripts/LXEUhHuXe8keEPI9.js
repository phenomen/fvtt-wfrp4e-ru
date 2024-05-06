const test = await this.actor.setupCharacteristic("wp", {
	fields: { difficulty: "average" },
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
});
await test.roll();
if (test.failed) {
	const stuns = Math.max(1, Math.abs(test.result.SL));
	this.actor.addCondition("stunned", stuns);
}
