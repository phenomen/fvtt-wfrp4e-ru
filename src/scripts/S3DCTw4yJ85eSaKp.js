this.actor
	.setupCharacteristic("s", {
		skipTargets: true,
		appendTitle: ` - ${this.effect.name}`,
	})
	.then((test) => test.roll());
