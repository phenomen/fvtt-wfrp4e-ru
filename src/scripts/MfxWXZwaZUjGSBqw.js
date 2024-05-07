if (this.actor.hasCondition("ablaze")) {
	this.script.scriptNotification("Иммунен к горению");
	await this.actor.hasCondition("ablaze")?.delete();
}
