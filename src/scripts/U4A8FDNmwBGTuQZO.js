if (args.attacker.has("Нежить") && !args.attacker.has("Бестелесность")) {
	args.totalWoundLoss = Math.floor(args.totalWoundLoss / 2);
	args.modifiers.other.push({
		label: this.effect.name,
		details: "Уполовинивание",
		value: "× 0.5",
	});
}
