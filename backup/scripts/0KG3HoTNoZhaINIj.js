const item = await fromUuid("Compendium.wfrp4e-core.items.4CMKeDTDrRQZbPIJ");
const fixation = await game.wfrp4e.tables.rollTable("fixations");
const data = item.toObject();
data.system.specification.value = fixation.result;
this.item.updateSource({ name: (this.item.name += ` (${fixation.result})`) });
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
