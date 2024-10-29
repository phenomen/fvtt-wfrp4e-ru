const item = await fromUuid("Compendium.wfrp4e-core.items.aE3pyW20Orvdjzj0");
const data = item.toObject();
data.system.specification.value = "религия";
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
