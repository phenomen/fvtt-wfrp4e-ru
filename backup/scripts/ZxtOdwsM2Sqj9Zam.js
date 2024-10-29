const item = await fromUuid("Compendium.wfrp4e-core.items.AtpAudHA4ybXVlWM");
const data = item.toObject();
data.system.specification.value = 0;
data.name = this.effect.name;
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
