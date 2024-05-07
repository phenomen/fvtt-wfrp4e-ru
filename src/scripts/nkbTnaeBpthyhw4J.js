const fortunePoints =
	this.effect.sourceTest.result.overcast.usage.other.current;
const current = this.actor.status.fortune.value;

this.actor.update({ "system.status.fortune.value": fortunePoints + current });

this.script.scriptMessage(
	`<b>${
		this.actor.prototypeToken.name
	}</b> пункты удачи увеличены с ${current} до ${fortunePoints + current}`,
);
