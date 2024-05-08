if (
	!this.item.name.includes("(") ||
	this.item.system.tests.value.includes("(восприятие)")
) {
	let tests = this.item.system.tests.value;
	let name = this.item.name;

	// If name already specifies, make sure tests value reflects that
	if (name.includes("(")) {
		const sense = name.split("(")[1].split(")")[0];
		tests = `${tests.split("(")[0].trim()} (${sense})`;
	} // If no sense specified, provide dialog choice
	else {
		const choice = await ItemDialog.create(
			ItemDialog.objectToArray(
				{
					taste: "вкус",
					sight: "зрение",
					smell: "запах",
					hearing: "слух",
					touch: "осязание",
				},
				this.item.img,
			),
			1,
			"Выберите восприятие",
		);
		if (choice[0]) {
			name = `${name.split("(")[0].trim()} (${choice[0].name})`;
			tests = `${tests.split("(")[0].trim()} (${choice[0].name})`;
		}
	}

	this.item.updateSource({ name, "system.tests.value": tests });
}
