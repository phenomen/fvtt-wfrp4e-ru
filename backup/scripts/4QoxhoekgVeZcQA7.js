const item = await fromUuid("Compendium.wfrp4e-core.items.M5QSWOYt2Rbv2yxW");
const data = item.toObject();
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
