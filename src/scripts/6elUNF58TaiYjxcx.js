const test = await this.actor.setupCharacteristic("wp", {
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
	context: { failure: "Получите состояние ошеломления" },
});
await test.roll();
if (test.failed) {
	this.actor.addCondition("stunned");
}
