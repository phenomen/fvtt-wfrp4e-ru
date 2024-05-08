if (args.opposedTest.result.hitloc.value === this.item.system.location.key) {
	args.actor.addCondition("bleeding", 1);
	this.script.scriptNotification("Истекает кровью 1");
}
