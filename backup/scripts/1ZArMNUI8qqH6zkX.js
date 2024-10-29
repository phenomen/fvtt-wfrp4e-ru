const test = await args.actor.setupCharacteristic("wp", {
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
	context: { failure: "Получите состояние ошеломлён" },
});
await test.roll();
if (test.failed) {
	args.actor.addCondition("stunned");
}
