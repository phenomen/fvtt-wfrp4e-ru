if (this.actor.type !== "character") {
	return;
}

const god = await ValueDialog.create("Введите божество", "Благословение");

if (god) {
	const prayers = await game.wfrp4e.utility.findAll(
		"prayer",
		"Loading Prayers",
	);
	const blessings = prayers.filter(
		(p) =>
			p.system.god.value
				.split(",")
				.map((i) => i.trim().toLowerCase())
				.includes(god.toLowerCase()) && p.system.type.value === "blessing",
	);
	if (blessings.length) {
		this.script.scriptNotification(
			`Добавление ${blessings.map((i) => i.name).join(", ")}`,
		);
		await this.actor.createEmbeddedDocuments("Item", blessings, {
			fromEffect: this.effect.id,
		});
	} else {
		this.script.scriptNotification(
			`Не обнаружено благословений, связанных с ${god}.`,
		);
	}
	this.item.updateSource({ name: this.item.name.replace("Any", god) });
	await this.actor.update({ "system.details.god.value": god });
}
