const item = await fromUuid("Compendium.wfrp4e-core.items.j6v78dnOOdCB6c3d");
const data = item.toObject();
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
