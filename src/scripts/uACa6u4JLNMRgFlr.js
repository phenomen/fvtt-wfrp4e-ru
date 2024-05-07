const talents = await Promise.all(
	["Свирепый натиск", "Мореплаватель"].map(game.wfrp4e.utility.findTalent),
);
this.actor.createEmbeddedDocuments("Item", talents, {
	fromEffect: this.effect.id,
});
