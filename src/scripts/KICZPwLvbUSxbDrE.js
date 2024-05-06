const table = game.wfrp4e.tables.findTable("mutatemental");
if (!table) {
	ui.notifications.error("Cannot find table with key: mutatemental");
}
const result = (await table.roll()).results[0];
const uuid = `Compendium.${result.documentCollection}.${result.documentId}`;
const item = await fromUuid(uuid);

if (item) {
	this.script.scriptNotification(`${item.name} added`);
	this.actor.createEmbeddedDocuments("Item", [item]);
} else {
	ui.notifications.error(`Item could not be found: ${uuid}`);
}
