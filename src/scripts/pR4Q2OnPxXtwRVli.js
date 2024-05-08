const criticals = this.actor.itemTypes.critical;

if (criticals.length) {
	this.script.scriptNotification("Не страдает от травм");
	this.actor.deleteEmbeddedDocuments(
		"Item",
		criticals.map((i) => i.id),
	);
}

if (getProperty(args.data, "system.status.wounds.value") === 0) {
	this.script.scriptNotification(
		`Бездействует в течение ${Math.ceil(CONFIG.Dice.randomUniform() * 10)} раундов`,
	);
}
