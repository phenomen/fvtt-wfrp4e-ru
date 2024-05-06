const characteristics = {
	ws: 10,
	bs: 0,
	s: 10,
	t: 10,
	i: 20,
	ag: 10,
	dex: 0,
	int: 0,
	wp: 15,
	fel: 0,
};
const skills = ["Cool", "Dodge", "Intimidate", "Leadership"];
const skillAdvancements = [15, 15, 10, 5];
const talents = ["Combat Aware", "Combat Reflexes", "Feint", "Resolute"];
const trappings = [
	"Mail Coat",
	"Mail Chausses",
	"Mail Coif",
	"Hand Weapon",
	"Shield",
];
const items = [];

const updateObj = this.actor.toObject();

for (const ch in characteristics) {
	updateObj.system.characteristics[ch].modifier += characteristics[ch];
}

for (let index = 0; index < skills.length; index++) {
	const skill = skills[index];
	let skillItem;
	skillItem = updateObj.items.find(
		(i) => i.name === skill && i.type === "skill",
	);
	if (skillItem) skillItem.system.advances.value += skillAdvancements[index];
	else {
		skillItem = await game.wfrp4e.utility.findSkill(skill);
		skillItem = skillItem.toObject();
		skillItem.system.advances.value = skillAdvancements[index];
		items.push(skillItem);
	}
}

for (const talent of talents) {
	const talentItem = await game.wfrp4e.utility.findTalent(talent);
	if (talentItem) {
		items.push(talentItem.toObject());
	} else {
		ui.notifications.warn(`Could not find ${talent}`, { permanent: true });
	}
}

for (const trapping of trappings) {
	let trappingItem = await game.wfrp4e.utility.findItem(trapping);
	if (trappingItem) {
		trappingItem = trappingItem.toObject();

		equip(trappingItem);

		items.push(trappingItem);
	} else {
		ui.notifications.warn(`Could not find ${trapping}`, { permanent: true });
	}
}

updateObj.name = `${this.effect.name} ${updateObj.name}`;

await this.actor.update(updateObj);
this.actor.createEmbeddedDocuments("Item", items);

function equip(item) {
	if (item.type === "armour") item.system.worn.value = true;
	else if (item.type === "weapon") item.system.equipped = true;
	else if (
		item.type === "trapping" &&
		item.system.trappingType.value === "clothingAccessories"
	)
		item.system.worn = true;
}
