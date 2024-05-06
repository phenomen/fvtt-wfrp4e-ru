if (this.item.system.quantity.value) {
	this.item.update({
		"system.quantity.value": this.item.system.quantity.value - 0.25,
	});
	const actor = Array.from(game.user.targets)[0]?.actor || this.actor;
	actor.applyEffect({
		effectData: [this.item.effects.contents[1].convertToApplied()],
	});
} else {
	this.script.scriptNotification("None left!", "error");
}
