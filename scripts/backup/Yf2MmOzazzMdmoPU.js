const armour = await fromUuid("Compendium.wfrp4e-core.items.VUJUZVN3VYhOaPjj");
const armourData = armour.toObject();
armourData.system.specification.value = 1;

const fury = await fromUuid("Compendium.wfrp4e-core.items.fjd1u9VAgiYzhBRp");
const furyData = fury.toObject();

const horns = await fromUuid("Compendium.wfrp4e-core.items.BqPZn6q3VHn9HUrW");
const hornsData = horns.toObject();
hornsData.system.specification.value = 6;

this.actor.createEmbeddedDocuments("Item", [armourData, furyData, hornsData], {
	fromEffect: this.effect.id,
});
