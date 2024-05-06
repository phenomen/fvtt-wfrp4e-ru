const careers = await game.wfrp4e.utility.findAll("career", "", true);
careers.forEach((c) => {
	if (!c.id) {
		c.id = c._id;
	}
});
const choice = await ItemDialog.create(careers, 1, "Choose Double Life Career");
if (choice[0]) {
	const career = await fromUuid(choice[0].uuid);
	const data = career.toObject();
	setProperty(data, "flags.wfrp4e.doubleLife", true);
	this.actor.createEmbeddedDocuments("Item", [data], {
		fromEffect: this.effect.id,
	});
	this.effect.updateSource({ name: `${this.effect.name} (${data.name})` });
}
