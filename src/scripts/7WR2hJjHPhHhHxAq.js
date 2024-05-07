const poisoned = args.actor.hasCondition("poisoned");
if (poisoned) {
	this.script.scriptNotification(
		`Удалите ${poisoned.conditionValue} состояний отравления`,
	);
	poisoned.delete();
} else this.script.scriptNotification("No Poisoned Conditions");
