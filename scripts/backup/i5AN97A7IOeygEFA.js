if (args.applyAP && args.modifiers.ap.metal) {
	args.modifiers.ap.ignored += args.modifiers.ap.metal;
	args.modifiers.other.push({
		value: args.modifiers.ap.metal,
		label: this.effect.name,
		details: "Добавить металлический КБ к урону",
	});
	args.modifiers.ap.details.push(
		`<strong>${this.effect.name}</strong>: игнорирует металл (${args.modifiers.ap.metal})`,
	);
	args.modifiers.ap.metal = 0;
}
