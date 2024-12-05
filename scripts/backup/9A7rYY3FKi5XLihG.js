fromUuid("Compendium.wfrp4e-core.items.5QcrpLQWWrsbKR79").then((item) => {
	const data = item.toObject();
	data.system.tests.value = data.system.tests.value.replace(
		"coins",
		"metal objects",
	);
	data.system.description.value +=
		"<p>Этот талант также распространяется на любые металлические предметы из-за <strong>сродства металлу</strong></p>";
	this.actor.createEmbeddedDocuments("Item", [data], {
		fromEffect: this.effect.id,
	});
});
