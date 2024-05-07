if (args.extendedTest?.getFlag("wfrp4e", "fear")) {
	this.script.scriptNotification("Невосприимчив к страху");
	args.extendedTest.delete();
	args.abort = true;
}
return args.options.terror || args.extendedTest?.getFlag("wfrp4e", "fear")
