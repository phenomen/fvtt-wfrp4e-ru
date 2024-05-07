if (this.item.system.quantity.value) {
	this.item.system.reduceQuantity();
	const actor = Array.from(game.user.targets)[0]?.actor || this.actor;
	const effectData = this.item.effects.contents[0].convertToApplied();
	const minutes = Math.ceil(CONFIG.Dice.randomUniform() * 10) * 10;
	effectData.duration.seconds = 60 * minutes;
	this.script.scriptMessage(`<strong>Длительность</strong>: ${minutes} минут`, {
		whisper: ChatMessage.getWhisperRecipients("GM"),
	});
	actor.applyEffect({ effectData: [effectData] });
} else {
	this.script.scriptNotification("None left!", "error");
}
