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
	3,
	"Выберите 3 простейших заклинания",
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
	3,
	"Выберите 3 общих заклинания",
);

const items = petty.concat(arcane).map((i) => i.toObject());

this.actor.createEmbeddedDocuments("Item", items);
