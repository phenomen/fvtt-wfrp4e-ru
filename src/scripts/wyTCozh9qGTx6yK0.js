if (args.options.terror || args.extendedTest?.getFlag("wfrp4e", "fear")) {
	args.abort = true;
	this.script.scriptNotification("Нет необходимости провдить проверки на страх или ужас");
}
