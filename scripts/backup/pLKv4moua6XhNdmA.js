const item = await fromUuid("Compendium.wfrp4e-core.items.1dUizIgLBgn4jICC");
const data = item.toObject();
data.name += " (леса)";
this.actor.createEmbeddedDocuments(
	"Item",
	Array(this.effect.sourceTest.result.overcast.usage.other.current).fill(data),
	{ fromEffect: this.effect.id },
);
