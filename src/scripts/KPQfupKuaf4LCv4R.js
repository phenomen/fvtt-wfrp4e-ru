const talents = await Promise.all(
	["Интриган", "Второе зрение"].map(game.wfrp4e.utility.findTalent),
);
this.actor.createEmbeddedDocuments("Item", talents, {
	fromEffect: this.effect.id,
});
