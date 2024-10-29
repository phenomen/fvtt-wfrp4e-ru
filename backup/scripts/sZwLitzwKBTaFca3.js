const item = await fromUuid(
	"Compendium.wfrp4e-core.items.Item.5hH73j2NgPdsLCZN",
);
const data = item.toObject();
data.name = data.name.replace("к группе", "зеленокожие, нежить, Хаос");
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
