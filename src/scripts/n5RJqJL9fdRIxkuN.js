if (this.actor.system.status.advantage.value > 0) {
	await this.actor.modifyAdvantage(-1);
	this.script.scriptNotification("Преимущество вычтено");
} else {
	return this.script.scriptNotification("Недостаточно преимуществ", "error")
}

const test = await this.actor.setupTrait(this.item);
await test.roll();
