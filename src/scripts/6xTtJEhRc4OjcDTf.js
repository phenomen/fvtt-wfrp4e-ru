if (getProperty(args.data, "system.status.fortune.value")) {
	this.script.scriptNotification("Невозможно изменить удачу");
	args.data.system.status.wounds.value = undefined;
}
