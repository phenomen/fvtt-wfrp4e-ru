const item = await fromUuid("Compendium.wfrp4e-core.items.GlShFJF2TpsNh1FX");
const data = item.toObject();
data.system.location.key = this.item.system.location.key;
data.system.location.value = data.system.location.value.replace("Рука", "Запястье");
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
