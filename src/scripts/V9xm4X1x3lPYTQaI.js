if (args.extendedTest?.getFlag("wfrp4e", "fear")) {
	this.script.scriptNotification("Невосприимчив к страху");
	args.extendedTest.delete();
	args.abort = true;
}
