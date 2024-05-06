if (getProperty(args.data, "system.loaded.value") === true) {
	const repeaterValue = Math.ceil(CONFIG.Dice.randomUniform() * 10);
	const qualities = foundry.utils.deepClone(this.item.system.qualities.value);
	const repeater = qualities.find((i) => i.name === "repeater");
	if (repeater) {
		repeater.value = repeaterValue;
	} else {
		qualities.push({ name: "repeater", value: repeaterValue });
	}
	setProperty(args.data, "system.loaded.amt", repeaterValue);
	this.item.update({ "system.qualities.value": qualities });
	this.script.scriptNotification(`Repeater ${repeaterValue}`);
} else if (getProperty(args.data, "system.loaded.value") === false) {
	const qualities = foundry.utils
		.deepClone(this.item.system.qualities.value)
		.filter((i) => i.name !== "repeater");
	this.item.update({ "system.qualities.value": qualities });
}
