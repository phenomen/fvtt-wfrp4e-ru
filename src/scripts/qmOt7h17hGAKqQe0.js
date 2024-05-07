const choice = await Dialog.wait({
	title: this.effect.name,
	content: `<p><strong>${this.effect.name}</strong>: Это дистанционная или магическая атака, исходящая из-за границы купола?</p>`,
	buttons: {
		yes: {
			label: "Да",
			callback: () => {
				return true;
			},
		},
		no: {
			label: "Нет",
			callback: () => {
				return false;
			},
		},
	},
});

if (choice) {
	args.ward = 6;
}
