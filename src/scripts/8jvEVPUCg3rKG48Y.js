const item = await fromUuid("Compendium.wfrp4e-core.items.9fq6p9Q6H02LjaSi");
const data = item.toObject();
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
