const locations = [];

while (locations.length < 2) {
	const loc = await game.wfrp4e.tables.rollTable("hitloc", { hideDSN: true });
	if (!locations.includes(loc.result)) {
		locations.push(loc.result);
	}
}

locationText = locations.map((i) => game.wfrp4e.config.locations[i]).join(", ");

this.item.updateSource({ name: (this.item.name += ` (${locationText})`) });
