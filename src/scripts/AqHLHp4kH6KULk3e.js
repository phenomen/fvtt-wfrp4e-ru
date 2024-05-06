if (this.item.system.quantity.value) {
	this.item.system.reduceQuantity();
	const actor = Array.from(game.user.targets)[0]?.actor || this.actor;
	const effectData = this.item.effects.contents[0].convertToApplied();
	effectData.flags.wfrp4e.sourceItem = this.item.uuid;
	actor.applyEffect({ effectData: [effectData] });
} else {
	this.script.scriptNotification("None left!", "error");
}
