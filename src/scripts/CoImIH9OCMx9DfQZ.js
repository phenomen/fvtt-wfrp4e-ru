const item = await fromUuid("Compendium.wfrp4e-core.items.nbhn2wX35b7Jrcbg");
const data = item.toObject();
data.system.location.value = "Челюсть";
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
