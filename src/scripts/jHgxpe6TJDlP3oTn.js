let spells = await game.wfrp4e.utility.findAll("spell", "Loading Spells");
spells = spells.filter((s) => ["slaanesh"].includes(s.system.lore.value));

const choice = await ItemDialog.create(spells, 1, "Выберите заклинание");
if (choice[0]) {
	this.item.updateSource({ name: `${this.item.name} (${choice[0].name})` });
	this.actor.createEmbeddedDocuments("Item", choice, {
		fromEffect: this.effect.id,
	});
}
