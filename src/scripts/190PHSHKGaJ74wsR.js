if (
	!this.item.name.includes("(") ||
	this.item.system.tests.value.includes("ландшафт")
) {
	let tests = this.item.system.tests.value;
	let name = this.item.name;

	// If name already specifies, make sure tests value reflects that
	if (name.includes("(")) {
		const terrain = name.split("(")[1].split(")")[0];
		tests = tests.replace("ландшафт", terrain);
	} // If no sense specified, provide dialog choice
	else {
		const choice = await ItemDialog.create(
			ItemDialog.objectToArray(
				{
					coastal: "побережья",
					deserts: "пустыни",
					marshes: "болота",
					rocky: "горы",
					tundra: "тундра",
					woodlands: "леса",
				},
				this.item.img,
			),
			1,
			"Выберите местность",
		);
		if (choice[0]) {
			name = `${name.split("(")[0].trim()} (${choice[0].name})`;
			tests = tests.replace("ландшафт", `${choice[0].name} Terrain`);
		}
	}

	this.effect.updateSource({ name });
	this.item.updateSource({ name, "system.tests.value": tests });
}
