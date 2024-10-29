if (
	["Слабое", "Сильное", "Мощное"].includes(this.item.system.specification.value)
) {
	return
}

const choice = await ItemDialog.create(
	ItemDialog.objectToArray(
		{ minor: "Слабое", moderate: "Сильное", major: "Мощное" },
		this.item.img,
	),
	1,
	"Выберите степень осквернения",
);

this.item.updateSource({ "system.specification.value": choice[0]?.name || "" });
