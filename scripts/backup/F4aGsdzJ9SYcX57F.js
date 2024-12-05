if (args.equipped) {
	const item = await fromUuid("Compendium.wfrp4e-core.items.HpFkVJ2lYPAWumUL");
	const data = item.toObject();
	this.actor.createEmbeddedDocuments("Item", [data], {
		fromEffect: this.effect.id,
	});
} else {
	this.effect.deleteCreatedItems();
}
