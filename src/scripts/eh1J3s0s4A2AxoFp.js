const item = await fromUuid(
	"Compendium.wfrp4e-core.items.Item.8pVzgPkgWpTJvfhG",
);
const data = item.toObject();
data.name += " (враг)";
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
