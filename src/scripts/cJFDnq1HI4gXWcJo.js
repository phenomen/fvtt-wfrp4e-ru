if (Number.isNaN(Number.parseInt(this.item.system.specification.value))) {
	const value = await ValueDialog.create("Значение оберега", "Введите значение оберега");
	if (value) {
		this.item.updateSource({ "system.specification.value": value });
	}
}
