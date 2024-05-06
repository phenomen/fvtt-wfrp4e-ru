const item = await fromUuid("Compendium.wfrp4e-core.items.gz2xy41OSVZ8YBgI");
const data = item.toObject();
data.system.location.key = this.item.system.location.key;
this.actor.createEmbeddedDocuments("Item", [data]);
