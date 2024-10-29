const item = await fromUuid("Compendium.wfrp4e-core.items.V0c3qBU1CMm8bmsW");
const data = item.toObject();
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
