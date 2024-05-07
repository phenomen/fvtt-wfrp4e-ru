if (["cast", "channelling", "pray"].includes(args.type)) {
	args.abort = true;
	this.script.scriptNotification("Не может сотворять заклинания или использовать чудеса ");
} else return true;
