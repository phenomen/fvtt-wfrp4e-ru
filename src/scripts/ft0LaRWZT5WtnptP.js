const advantage = this.actor.system.status.advantage.value;
if (advantage > 0) {
	await this.actor.setAdvantage(0);
	this.script.scriptNotification("Преимущества вычтены");
} else {
	return this.script.scriptNotification("Недостаточно преимуществ!", "error")
}

const test = await this.actor.setupTrait(this.item, {
	fields: { slBonus: advantage },
});
await test.roll();
