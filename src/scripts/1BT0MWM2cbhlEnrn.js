const characteristics = {
	ws: 5,
	bs: 5,
	s: 5,
	t: 0,
	i: 5,
	ag: 5,
	dex: 5,
	int: 0,
	wp: 5,
	fel: 5,
};
const items = [];

const updateObj = this.actor.toObject();

const talents = (
	await Promise.all([
		game.wfrp4e.tables.rollTable("talents"),
		game.wfrp4e.tables.rollTable("talents"),
		game.wfrp4e.tables.rollTable("talents"),
	])
).map((i) => i.text);

for (const ch in characteristics) {
	updateObj.system.characteristics[ch].modifier += characteristics[ch];
}

for (const talent of talents) {
	const talentItem = await game.wfrp4e.utility.findTalent(talent);
	if (talentItem) {
		items.push(talentItem.toObject());
	} else {
		ui.notifications.warn(`Could not find ${talent}`, { permanent: true });
	}
}

await this.actor.update(updateObj);
this.actor.createEmbeddedDocuments("Item", items);
