const item = await fromUuid(
	"Compendium.wfrp4e-core.items.Item.pTorrE0l3VybAbtn",
);
const data = item.toObject();
data.system.specification.value = 2;
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
