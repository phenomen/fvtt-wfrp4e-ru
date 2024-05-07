if (
	args.test.characteristicKey === "wp" &&
	args.test.failed &&
	args.test.result.SL <= -3
) {
	this.script.scriptNotification("Добавить 'сбит с ног'");
	this.actor.addCondition("prone");
}
