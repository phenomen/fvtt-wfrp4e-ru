let item = await fromUuid("Compendium.wfrp4e-core.items.Q2MCUrG2HppMcvN0");
item = item.toObject();
const species = args.actor.Species || " of your species";
item.name = `Враждебность (все не ${species})`;
this.actor.createEmbeddedDocuments("Item", [item], {
	fromEffect: this.effect.id,
});
