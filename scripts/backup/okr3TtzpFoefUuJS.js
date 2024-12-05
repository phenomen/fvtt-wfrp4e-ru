const item = await fromUuid("Compendium.wfrp4e-core.items.EaqlLRQigwnsEAXX");
const data = item.toObject();
data.system.location.value = "Collar Bone";
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
