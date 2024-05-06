const item = await fromUuid("Compendium.wfrp4e-core.items.MGEPI4jNhymNIRVz");
const data = item.toObject();
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
