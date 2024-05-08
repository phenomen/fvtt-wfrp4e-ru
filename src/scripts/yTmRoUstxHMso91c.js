if (args.item.name === "Устойчивость к магии" && args.item.type === "trait") {
	args.item.system.specification.value =
		Number(args.item.system.specification.value) + 1;
}
