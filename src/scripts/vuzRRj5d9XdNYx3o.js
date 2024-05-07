const broken = this.actor.hasCondition("broken");
if (broken) {
	broken.delete();
	this.script.scriptNotification("Удалить состояние 'в панике'");
}
