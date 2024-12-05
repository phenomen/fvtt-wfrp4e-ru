let type = this.item.getFlag("wfrp4e", "breath");
const types = {
	none: "нет",
	cold: "ледяное",
	corrosion: "едкое",
	fire: "огненное",
	electricity: "электрическое",
	poison: "ядовитое",
	smoke: "дымное",
	various: "варьируется",
};
if (!type) {
	type = (
		await ItemDialog.create(
			ItemDialog.objectToArray(types, this.item.img),
			1,
			"Выберите дыхание",
		)
	)[0]?.id;
	this.item.updateSource({ "flags.wfrp4e.breath": type });
}

if (!this.item.name.includes("(") && types[type] && type !== "none") {
	this.item.updateSource({
		name: (this.item.name += ` (${types[type]})`),
		"system.specification.value": this.item.system.specification.value
			.replace("(Type)", "")
			.trim(),
	});
}
