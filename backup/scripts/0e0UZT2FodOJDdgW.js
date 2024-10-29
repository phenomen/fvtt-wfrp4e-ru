const item = await fromUuid("Compendium.wfrp4e-core.items.GbDyBCu8ZjDp6dkj");
const data = item.toObject();
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
