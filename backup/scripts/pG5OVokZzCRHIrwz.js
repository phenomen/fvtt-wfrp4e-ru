const item = await fromUuid("Compendium.wfrp4e-core.items.mgeiaDZXei7JBEgo");
const data = item.toObject();
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
