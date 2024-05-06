if (Number.isNaN(Number.parseInt(this.item.system.specification.value))) {
	const value = await ValueDialog.create("Ward Value", "Enter the Ward value");
	if (value) {
		this.item.updateSource({ "system.specification.value": value });
	}
}
