const fatigued = this.actor.hasCondition("fatigued");
if (!fatigued) {
	this.actor.addCondition("fatigued");
	ui.notifications.notify(
		` Усталость добавляется ${this.actor.name}, которую нельзя снять, пока не исчезнут симптомы слабости.`,
	);
}
