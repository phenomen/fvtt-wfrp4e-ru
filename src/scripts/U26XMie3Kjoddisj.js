const stunned = this.actor.hasCondition("stunned");
if (stunned) {
	this.script.scriptNotification("Удалите 1 состояние ошеломления");
	this.actor.removeCondition("stunned");
} else {
	this.script.scriptNotification("Нет состояний ошеломления");
}
