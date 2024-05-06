const amount = this.effect.sourceTest.result.overcast.usage.other.current;

const sss = await fromUuid("Compendium.wfrp4e-core.items.MGEPI4jNhymNIRVz");
const strider = await fromUuid("Compendium.wfrp4e-core.items.1dUizIgLBgn4jICC");

const items = Array(amount).fill(sss).concat(Array(amount).fill(strider));

this.actor.createEmbeddedDocuments("Item", items, {
	fromEffect: this.effect.id,
});
