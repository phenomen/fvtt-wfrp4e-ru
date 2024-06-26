const wounds = this.actor.itemTypes.disease.filter(
	(i) => i.name === "Нагноение" && i.system.duration.active,
);
let selected;
if (wounds.length === 0) {
	return this.script.scriptNotification("Нет нагноения!");
} else if (wounds.length === 1) {
	selected = wounds[0];
} else if (wounds.length >= 2) {
	selected = (await ItemDialog.create(wounds, 1))[0];
}

if (selected) {
	const test = await this.actor.setupSkill(
		game.i18n.localize("NAME.Endurance"),
		{ fields: { difficulty: "average" } },
	);
	await test.roll();
	if (test.succeeded) {
		const SL = Number.parseInt(test.result.SL);
		if (SL >= 0) {
			selected.update({
				"system.duration.value": selected.system.duration.value - SL,
			});
			this.script.scriptMessage(
				`<strong>${selected.name}</strong>: продолжительность уменьшена на ${SL}!`,
			);
		}
	}
}
