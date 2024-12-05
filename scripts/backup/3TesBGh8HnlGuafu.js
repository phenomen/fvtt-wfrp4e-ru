const modifier =
	this.effect.sourceTest?.result.overcast.usage.other.current || 0;

const test = await this.actor.setupCharacteristic("dex", {
	fields: { modifier },
	skipTargets: true,
	appendTitle: ` - ${this.script.label}`,
});

test.roll();
