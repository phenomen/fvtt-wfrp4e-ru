const item = await fromUuid("Compendium.wfrp4e-core.items.5KP9sOoLSGvj9EXp");
const data = item.toObject();
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
