const item = await fromUuid("Compendium.wfrp4e-core.items.xneBqGOs1QS7kfUr");
const data = item.toObject();
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
