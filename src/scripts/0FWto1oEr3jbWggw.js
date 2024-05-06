const spells = await game.wfrp4e.utility.findAll("spell", "Loading Spells");

const text = (
	await game.wfrp4e.tables.rollTable("random-caster", { hideDSN: true })
).result;

lore = Array.from(text.matchAll(/{(.+?)}/gm))[0][1];

if (text === "GM's Choice") {
	return this.script.scriptNotification(text)
}

if (spellsWithLore.length > 0) {
	const spellsWithLore = spells.filter(
		(i) => game.wfrp4e.config.magicLores[i.system.lore.value] === lore,
	);
	const selectedSpell =
		spellsWithLore[
			Math.floor(CONFIG.Dice.randomUniform() * spellsWithLore.length)
		];
	this.script.scriptNotification(selectedSpell.name);
	this.actor.createEmbeddedDocuments("Item", [selectedSpell]);
} else {
	ui.notifications.notify(`Could not find ${lore} spell. Try Again`);
}
