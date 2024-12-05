const item = await fromUuid(
	"Compendium.wfrp4e-core.items.Item.KII1gWnxIZ8HzmU5",
);
const data = item.toObject();
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
