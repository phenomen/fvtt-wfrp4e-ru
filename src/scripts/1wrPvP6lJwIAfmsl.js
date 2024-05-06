const choice = await ItemDialog.create(
	ItemDialog.objectToArray(game.wfrp4e.config.locations),
	1,
	"Choose Location",
);

const location = choice[0].id;

const itemTargeted = this.actor.items.get(
	this.effect.getFlag("wfrp4e", "itemTargets")[0],
);

if (itemTargeted) {
	itemTargeted.update({
		[`system.APdamage.${location}`]: itemTargeted.system.APdamage[location] + 1,
	});
}
