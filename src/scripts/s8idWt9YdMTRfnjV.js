const item = await fromUuid("Compendium.wfrp4e-core.items.BqPZn6q3VHn9HUrW");
const data = item.toObject();
data.system.specification.value = 4 - this.actor.characteristics.s.bonus;
data.name = item.name.replace("(вид)", "");
this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
