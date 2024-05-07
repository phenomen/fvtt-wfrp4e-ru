let halve;
if (args.opposedTest.attackerTest.item?.type !== "spell") {
	halve = await Dialog.confirm({
		title: this.effect.name,
		content:
			"Уменьшить вдвое урон? (Все виды урона, кроме огня, холода и магии)",
	});
} else {
	halve = false;
}

if (halve) {
	args.totalWoundLoss /= 2;
	args.modifiers.other.push({
		label: this.effect.name,
		details: "Уполовинивание",
		value: "× 0.5",
	});
}
