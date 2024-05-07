if (this.actor.system.status.advantage.value >= 2) {
	await this.actor.modifyAdvantage(-2);
	this.script.scriptNotification("Преимущество вычтено");
} else {
	return this.script.scriptNotification("Недостаточно преимуществ!", "error")
}

const test = await this.actor.setupTrait(this.item);
await test.roll();
