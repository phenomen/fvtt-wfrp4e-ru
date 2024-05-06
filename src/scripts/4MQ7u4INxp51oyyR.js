const characteristics = {
	ws: 25,
	bs: 10,
	s: 15,
	t: 15,
	i: 25,
	ag: 20,
	dex: 0,
	int: 10,
	wp: 25,
	fel: 10,
};
const skills = [
	"Хладнокровие",
	"Уклонение",
	"Запугивание",
	"Интуиция",
	"Лидерство",
	"Знание (военное дело)",
	"Наблюдательность",
];
const skillAdvancements = [15, 15, 15, 15, 15, 10, 10];
const talents = [
	"Combat Aware",
	"Combat Reflexes",
	"Feint",
	"Inspiring",
	"Resolute",
	"War Leader",
];
const trappings = ["Ручное оружие", "Shield"];
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

updateObj.name = updateObj.name += ` ${this.effect.name}`;

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
