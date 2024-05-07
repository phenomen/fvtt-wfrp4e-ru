if (this.actor.hasCondition("broken")) {
	this.actor.removeCondition("broken");
	this.script.scriptNotification("Больше не в панике");
}
