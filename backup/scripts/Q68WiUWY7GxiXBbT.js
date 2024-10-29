const item = await fromUuid("Compendium.wfrp4e-core.items.9GNpAqgsKzxZKJpp");
const data = item.toObject();
data.system.specification.value = "когда один";
data.effects[0].disabled = true;
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
