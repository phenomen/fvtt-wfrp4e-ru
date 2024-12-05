let halve;
if (args.opposedTest.attackerTest.item?.type !== "spell") {
	halve = await Dialog.confirm({
		title: this.effect.name,
		content: "Уменьшить урон вдвое? (уменьшает урон от любого огня)",
	});
} else {
	halve = args.opposedTest.attackerTest.item?.system.lore?.value === "fire";
}

if (halve) {
	args.totalWoundLoss /= 2;
	args.modifiers.other.push({
		label: this.effect.name,
		details: "Уполовинивание",
		value: "× 0.5",
	});
}
