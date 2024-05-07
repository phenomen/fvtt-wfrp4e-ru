const fatigued = this.actor.hasCondition("fatigued");
if (fatigued) {
	this.script.scriptNotification(
		`Удалить ${fatigued.conditionValue} состояний усталости`,
	);
	fatigued.delete();
} else {
	this.script.scriptNotification("Нет состояний усталости");
}
