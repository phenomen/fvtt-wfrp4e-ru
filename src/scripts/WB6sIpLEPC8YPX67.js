if (args.options.dodge) {
	args.abort = true;
	this.script.scriptNotification("Нельзя уклониться!");
}
return ["t", "int", "wp", "fel"].includes(args.characteristic)
