if (this.actor.hasCondition("bleeding")) {
	this.actor.removeCondition("bleeding");
	this.script.scriptNotification("Удалено 1 состояние кровотечения");
} else {
	this.script.scriptNotification("Нет кровотечений");
}
