const table = game.wfrp4e.tables.findTable("mutatephys");
if (!table) {
	return ui.notifications.error("Mutation table not found, please ensure a table with the `mutatephys` key is imported in the world.")
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
