const characteristics = {
	ws: 0,
	bs: 0,
	s: 0,
	t: 5,
	i: 15,
	ag: 0,
	dex: 10,
	int: 15,
	wp: 15,
	fel: 0,
};
const skills = [
	"Концентрация",
	"Хладнокровие",
	"Уклонение",
	"Артистизм (сказительство)",
	"Интуиция",
	"Язык (магический)",
	"Знание (магия)",
	"Наблюдательность",
];
const skillAdvancements = [5, 15, 10, 10, 15, 10, 10, 20];
const talents = ["Arcane Magic", "Petty Magic", "Second Sight"];
const trappings = [
	"Hand Weapon",
	"Quarterstaff",
	"Ritual Dress incorporating many ingredients and fetishes",
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
		items.push({
			name: trapping,
			type: "trapping",
			"system.trappingType.value": "clothingAccessories",
		});
		//ui.notifications.warn(`Could not find ${trapping}`, {permanent : true})
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
