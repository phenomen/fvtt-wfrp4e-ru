const item = await fromUuid(
	"Compendium.wfrp4e-core.items.Item.pTorrE0l3VybAbtn",
);
const data = item.toObject();
const value =
	getProperty(this.effect.sourceTest, "result.overcast.usage.other.current") ||
	1;
data.system.specification.value = value;
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
