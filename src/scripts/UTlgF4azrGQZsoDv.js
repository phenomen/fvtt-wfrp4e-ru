const talents = await Promise.all(
	["Амбидекстер", "Отвлекающий манёвр"].map(game.wfrp4e.utility.findTalent),
);
this.actor.createEmbeddedDocuments("Item", talents, {
	fromEffect: this.effect.id,
});
