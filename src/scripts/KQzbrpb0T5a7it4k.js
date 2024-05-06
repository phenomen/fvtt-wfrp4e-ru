const item = await fromUuid(
	"Compendium.wfrp4e-core.items.Item.vMYEkrWj0ip6ZOdv",
);
const data = item.toObject();
data.name += " (Disease)";
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
