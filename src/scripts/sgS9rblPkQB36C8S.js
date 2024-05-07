if (this.item.name.includes("(")) {
	const trade = this.item.parenthesesText;
	if (trade?.toLowerCase() !== "any")
		return this.item.updateSource({"system.tests.value" : this.item.system.tests.value.replace("any one", trade)})
}

const index = game.packs
	.filter((i) => i.metadata.type === "Item")
	.reduce((acc, pack) => acc.concat(pack.index.contents), [])
	.filter(
		(i) =>
			i.type === "skill" && i.name.includes(game.i18n.localize("NAME.Trade")),
	)
	.map((i) => {
		i.id = i._id;
		return i;
	});

const choice = await ItemDialog.create(index, 1, "Выберите навык ремесла");
let text;
if (!choice[0]) {
	const custom = await ValueDialog.create(
		"Введине навык ремесла",
		"Специализация ремесла",
	);
	text = custom || "";
} else {
	text = game.wfrp4e.utility.extractParenthesesText(choice[0].name);
}

await this.item.updateSource({
	name: `${this.item.name
		.replace("(любое)", "")
		.replace("(любое)", "")
		.trim()} (${text})`,
	"system.tests.value": this.item.system.tests.value.replace("any one", text),
});
