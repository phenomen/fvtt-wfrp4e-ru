if (args.item.type === "spell") {
	const range = Number.parseInt(args.item.Duration);
	if (Number.isNumeric(range)) {
		args.item.system.duration.value = `2 * ${args.item.system.duration.value}`;
	}
}
