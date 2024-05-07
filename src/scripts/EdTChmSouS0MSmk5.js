const test = await this.actor.setupCharacteristic("wp", {
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
});
await test.roll();
if (test.succeeded) {
	this.script.scriptMessage("Можно совершить либо действие либо перемещение");
} else {
	this.script.scriptMessage("Невозможно совершить действие или перемещение в этом раунде");
}
