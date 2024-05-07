if (this.actor.system.status.advantage.value >= 3) {
	this.actor.modifyAdvantage(-3);
	this.script.scriptNotification("Преимущество уменьшено!");
} else {
	return this.script.scriptNotification("Не хватает преимуществ!", "error")
}

const test = await this.actor.setupTrait(this.item);
await test.roll();
