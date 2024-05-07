const table = game.wfrp4e.tables.findTable("mutatemental");
if (!table) {
	ui.notifications.error("Не удаётся найти таблицу с ключом: mutatemental");
}
const result = (await table.roll()).results[0];
const uuid = `Compendium.${result.documentCollection}.${result.documentId}`;
const item = await fromUuid(uuid);

if (item) {
	this.script.scriptNotification(`${item.name} added`);
	this.actor.createEmbeddedDocuments("Item", [item]);
} else {
	ui.notifications.error(`Объект не обнаружен: ${uuid}`);
}
