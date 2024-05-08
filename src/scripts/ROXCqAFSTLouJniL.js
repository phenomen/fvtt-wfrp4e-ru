if (args.test.spell.name === "Искажающая молния") {
	if (
		args.test.result.minormis ||
		args.test.result.majormis ||
		args.test.result.catastrophicmis
	) {
		this.script.scriptMessage(`<strong>${this.item.name}</strong> перегружен!`);
	}
}
