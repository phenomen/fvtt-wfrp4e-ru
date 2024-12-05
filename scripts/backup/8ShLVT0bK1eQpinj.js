const item = await fromUuid("Compendium.wfrp4e-core.items.k00PimCWkff11IA0");
const data = item.toObject();
data.system.location.key = this.item.system.location.key;
this.actor.createEmbeddedDocuments("Item", [data]);
