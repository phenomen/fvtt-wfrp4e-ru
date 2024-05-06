const item = await fromUuid("Compendium.wfrp4e-core.items.oGbDwnLOn3isPJpO");
const data = item.toObject();
data.name += " (To Be Determined)";
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
