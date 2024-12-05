const test = await this.actor.setupCharacteristic("ag", {
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
	context: { failure: "Сбит с ног" },
});
await test.roll();
if (test.failed) {
	this.actor.addCondition("prone");
}
