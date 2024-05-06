const item = await fromUuid("Compendium.wfrp4e-core.items.IFKWu98qmWpaSfUi");
const data = item.toObject();
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
