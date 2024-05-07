if (this.actor.hasCondition("surprised")) {
	this.actor.removeCondition("surprised");
	this.script.scriptMessage("Не застигнут врасплох");
}
