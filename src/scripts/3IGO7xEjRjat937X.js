const fatigue = this.actor.hasCondition("fatigued");
if (fatigue) {
	this.script.scriptNotification(
		"Удалите состояние усталости, эффект нивелирован",
	);
	this.effect.update({ disabled: true });
	await this.actor.removeCondition("fatigued");
}
