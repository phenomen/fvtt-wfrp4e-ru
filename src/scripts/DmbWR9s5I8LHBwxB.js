const column = await ValueDialog.create(
	"Выберите столбец, по которому вы совершите бросок, чтобы определить голову животного",
	"Выберите столбец",
	"",
	["Неделимый", "Кхорн", "Нургл", "Слаанеш", "Тзинч"],
);

if (column) {
	const result = await game.wfrp4e.tables.rollTable("beasthead", {}, column);
	this.script.scriptMessage(
		`<strong>${result.title}</strong><br>${result.result}`,
	);
	const uuid = `Compendium.${result.object.documentCollection}.${result.object.documentId}`;
	const item = await fromUuid(uuid);
	if (item) {
		this.actor.createEmbeddedDocuments("Item", [item]);
		this.item.delete();
	}
}
