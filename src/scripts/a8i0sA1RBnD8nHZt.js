const caster = this.effect.sourceActor;
const targetedItem = this.actor.items.get(
	this.effect.flags.wfrp4e.itemTargets[0],
);

const qualities = foundry.utils.deepClone(game.wfrp4e.config.itemQualities);
const flaws = foundry.utils.deepClone(game.wfrp4e.config.itemFlaws);

if (targetedItem.type === "weapon") {
	mergeObject(qualities, game.wfrp4e.config.weaponQualities);
	mergeObject(flaws, game.wfrp4e.config.weaponFlaws);
} else if (targetedItem.type === "armour") {
	mergeObject(qualities, game.wfrp4e.config.armorQualities);
	mergeObject(flaws, game.wfrp4e.config.armorFlaws);
}

for (const q in qualities) {
	// If the weapon already has a flaw, don't put it in the dialog
	if (targetedItem.system.properties.qualities[q]) {
		delete qualities[q];
	}
}
for (const f in flaws) {
	// If a weapon doesn't have a flaw, don't put it in the dialog
	if (!targetedItem.system.properties.flaws[f]) {
		delete flaws[f];
	}
}

const added = await ItemDialog.create(
	ItemDialog.objectToArray(qualities),
	"unlimited",
	"Выберите достоинства для добавления",
);
let removed = [];
if (!foundry.utils.isEmpty(flaws)) {
	removed = await ItemDialog.create(
		ItemDialog.objectToArray(flaws),
		"unlimited",
		"Выберите изъяны для удаления",
	);
}

this.effect.updateSource({
	"flags.wfrp4e.propertiesChanged": {
		added: added.map((i) => i.id),
		removed: removed.map((i) => i.id),
	},
});
