const item = await fromUuid("Compendium.wfrp4e-core.items.klCJX0mNpXYH5AIx");
const data = item.toObject();
data.name = data.name.replace("против группы", "странники");
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
