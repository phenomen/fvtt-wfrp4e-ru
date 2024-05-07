const bleeding = this.actor.hasCondition("bleeding");
if (bleeding) {
	this.script.scriptNotification(
		`Удалите ${bleeding.conditionValue} состояний кровотечения`,
	);
	bleeding.delete();
} else {
	this.script.scriptNotification("Не истекает кровью");
}
