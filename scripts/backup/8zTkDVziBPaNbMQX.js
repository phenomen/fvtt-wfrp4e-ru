let filters = [
	{
		property: "type",
		value: "spell",
	},
	{
		property: "system.lore.value",
		value: "petty",
	},
];

const petty = await game.wfrp4e.apps.ItemDialog.createFromFilters(
	filters,
	6,
	"Выберите 6 простейших заклинаний",
);

filters = [
	{
		property: "type",
		value: "spell",
	},
	{
		property: "system.lore.value",
		value: "",
	},
];

const arcane = await game.wfrp4e.apps.ItemDialog.createFromFilters(
	filters,
	9,
	"Выберите 9 общих заклинаний",
);

const items = petty.concat(arcane).map((i) => i.toObject());

this.actor.createEmbeddedDocuments("Item", items);
