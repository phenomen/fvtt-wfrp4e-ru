const useWard = await Dialog.wait({
	title: this.effect.name,
	content: `<p>Использовать Оберег, полученный от <strong>${this.effect.name}</strong>?`,
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

if (useWard) args.ward = 9;
