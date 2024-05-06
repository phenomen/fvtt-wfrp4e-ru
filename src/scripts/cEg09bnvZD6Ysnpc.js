const item = await fromUuid(
	"Compendium.wfrp4e-archives2.items.anIlqJXFOIEzIOo1",
);
const data = item.toObject();
data.name = this.item.name;
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
