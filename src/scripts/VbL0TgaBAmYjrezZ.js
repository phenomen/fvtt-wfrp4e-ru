const talents = await Promise.all(
	["Здоровяк"].map(game.wfrp4e.utility.findTalent),
);
this.actor.createEmbeddedDocuments("Item", talents, {
	fromEffect: this.effect.id,
});
