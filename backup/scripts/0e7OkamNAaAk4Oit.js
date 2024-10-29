const item1 = await fromUuid("Compendium.wfrp4e-core.items.3S4OYOZLauXctmev");
const item2 = await fromUuid("Compendium.wfrp4e-core.items.7mCcI3q7hgWcmbBU");

const data1 = item1.toObject();
data1.system.location.key = this.item.system.location.key;

const data2 = item2.toObject();
data2.system.location.key = this.item.system.location.key;

this.actor.createEmbeddedDocuments("Item", [data1, data2], {
	fromEffect: this.effect.id,
});
