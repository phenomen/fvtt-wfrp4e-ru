const choice = await ItemDialog.create(
	ItemDialog.objectToArray(
		{
			int: game.wfrp4e.config.characteristics.int,
			fel: game.wfrp4e.config.characteristics.fel,
		},
		this.effect.img,
	),
	1,
	"Выберите характеристику",
);

this.effect.updateSource({ "flags.wfrp4e.characteristic": choice[0].id });
