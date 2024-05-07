const test = await this.actor.setupCharacteristic("wp", {
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
	context: {
		failure:
			"<strong>Сбит с толку</strong>: определите поведение по @Table[bewilder]{таблице}.",
	},
});
await test.roll();
return test.failed
