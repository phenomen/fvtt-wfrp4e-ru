const item = await fromUuid("Compendium.wfrp4e-core.items.kJNAY1YRaCy9IgmT");
const terrorTraitItem = item.toObject();
terrorTraitItem.system.specification.value = Number(
	this.effect.item.system.specification.value,
);
this.actor.createEmbeddedDocuments("Item", [terrorTraitItem]);
