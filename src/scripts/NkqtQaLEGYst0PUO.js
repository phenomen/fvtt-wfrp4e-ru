if (this.actor.has("Magic Resistance", "talent")) return

const item = await fromUuid(
	"Compendium.wfrp4e-core.items.Item.eowbsW6oHGSNJmxV",
);
this.actor.createEmbeddedDocuments("Item", [item], {
	fromEffect: this.effect.id,
});
