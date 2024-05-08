const spells = await game.wfrp4e.utility.findAll("spell", "Loading Spells");

let lore = (
	await game.wfrp4e.tables.rollTable("random-caster", { hideDSN: true })
).text;
this.script.scriptNotification(lore);
if (lore === "GM's Choice") {
	return
} else if (lore === "Школа магии") {
	lore = "Arcane";
} else if (lore === "Простейшая магия") {
	lore = "petty";
} else {
	lore = lore.toLowerCase();
}

let spellsWithLore = [];
if (lore === "Arcane") {
	spellsWithLore = spells.filter((i) => !i.system.lore.value);
} else {
	spellsWithLore = spells.filter((i) => i.system.lore.value === lore);
}

const selectedSpell =
	spellsWithLore[
		Math.floor(CONFIG.Dice.randomUniform() * spellsWithLore.length)
	];
Item.implementation
	.create(selectedSpell.toObject(), { parent: this.actor })
	.then((item) => {
		this.actor.setupCast(item).then((test) => test.roll());
	});
