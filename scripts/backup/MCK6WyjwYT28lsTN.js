const item = await fromUuid("Compendium.wfrp4e-core.items.u0CFf3xwiyidD9T5");
const data = item.toObject();
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
