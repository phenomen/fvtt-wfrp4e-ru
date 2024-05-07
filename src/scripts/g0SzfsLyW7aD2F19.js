if (
	this.item.name.includes("(") &&
	this.item.system.tests.value.includes("(социальная группа)")
) {
	let tests = this.item.system.tests.value;
	const name = this.item.name;

	// If name already specifies, make sure tests value reflects that
	if (name.includes("(")) {
		const group = name.split("(")[1].split(")")[0];
		tests = `${tests.split("(")[0].trim()} (${group})`;
	}
	this.item.updateSource({ name, "system.tests.value": tests });
}
