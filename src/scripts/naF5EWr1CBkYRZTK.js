if (args.opposedTest?.attackerTest?.item?.system?.isRanged) {
	const choice = await Dialog.wait({
		title: this.effect.name,
		content: `<p>Отменить урон с помощью <strong>${this.effect.name}</strong>?`,
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
		args.abort = `<strong>${this.effect.name}</strong>: Урон отменён`;
	}
}
