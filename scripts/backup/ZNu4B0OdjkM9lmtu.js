const item = await fromUuid("Compendium.wfrp4e-core.items.9h82z72XGo9tfgQS");
const data = item.toObject();
data.name = data.name += " (зрение)";
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
