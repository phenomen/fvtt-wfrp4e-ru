const item = await fromUuid("Compendium.wfrp4e-core.items.7rBhIRo96Mydo0Cv");
const data = item.toObject();
data.system.location.value = "Back";
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
