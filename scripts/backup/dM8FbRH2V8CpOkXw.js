const item = await fromUuid("Compendium.wfrp4e-core.items.QluSTTTq3viHJJUh");
const data = item.toObject();
data.system.location.value = "Рёбра";
await this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
