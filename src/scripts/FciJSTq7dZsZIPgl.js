if (args.equipped) {
	const item = await fromUuid("Compendium.wfrp4e-core.items.SfUUdOGjdYpr3KSR");
	const data = item.toObject();
	this.actor.createEmbeddedDocuments("Item", [data], {
		fromEffect: this.effect.id,
	});
} else {
	this.effect.deleteCreatedItems();
}
