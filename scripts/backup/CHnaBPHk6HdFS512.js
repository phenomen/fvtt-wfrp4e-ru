const arm = await fromUuid("Compendium.wfrp4e-core.items.MnMZv7ZXoRqoH9dS");
const leg = await fromUuid("Compendium.wfrp4e-core.items.k00PimCWkff11IA0");

const choice = await ItemDialog.create([arm, leg], 1, "Выберите конечность");

this.actor.createEmbeddedDocuments("Item", choice, {
	fromEffect: this.effect.id,
});
