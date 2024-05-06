if (args.item.type === "spell") {
	const range = Number.parseInt(args.item.Range);
	if (Number.isNumeric(range)) {
		args.item.system.range.value = `2 * ${args.item.system.range.value}`;
	}
}
