const blunt = await Dialog.confirm({
	label: "test",
	content: "<p>Уменьшить урон тупым предметом? (-3)</p>",
});

if (blunt) {
	args.modifiers.other.push({
		label: this.effect.name,
		details: "Дробящий урон уменьшен",
		value: -3,
	});
}
