const item = await fromUuid("Compendium.wfrp4e-core.items.xsGbDFqK2qh7lsIj");
const data = item.toObject();
data.system.specification.value = "Minor";
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
