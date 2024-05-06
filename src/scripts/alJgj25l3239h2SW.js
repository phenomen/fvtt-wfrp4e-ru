const item = await fromUuid("Compendium.wfrp4e-core.items.hTgrGkWnmIR4xhVe");
const data = item.toObject();
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
