const ablaze = this.actor.hasCondition("ablaze");
if (ablaze) {
	this.script.scriptNotification("Невосприимчив к горению");
	ablaze.delete();
}
