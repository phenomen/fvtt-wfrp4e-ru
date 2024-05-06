const item = await fromUuid("Compendium.wfrp4e-core.items.0hn6UaKq8CoZP2zD");
const data = item.toObject();
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
