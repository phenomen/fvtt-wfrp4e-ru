const item = await fromUuid("Compendium.wfrp4e-core.items.CnydL8p3PVAuF98w");
const data = item.toObject();
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
