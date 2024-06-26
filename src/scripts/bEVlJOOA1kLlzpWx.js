const characteristics = {
	ws: 10,
	bs: 0,
	s: 5,
	t: 15,
	i: 20,
	ag: 15,
	dex: 20,
	int: 35,
	wp: 30,
	fel: 10,
};
const skills = [
	"Концентрация",
	"Хладнокровие",
	"Уклонение",
	"Артистизм (сказительство)",
	"Интуиция",
	"Язык (магический)",
	"Лидерство",
	"Знание (магия)",
	"Знание (теология)",
	"Наблюдательность",
];
const skillAdvancements = [20, 25, 20, 25, 30, 25, 15, 20, 10, 30];
const talents = [
	"Эфирный унисон",
	"Школа магии",
	"Безупречная дикция",
	"Безупречная дикция",
	"Фортуна",
	"Магическое чутье",
	"Грозный вид",
	"Простейшая магия",
	"Второе зрение",
	"Шестое чувство",
];
const trappings = [
	"Ручное оружие",
	"Посох",
	"Ритуальная одежда, включающая в себя множество ингредиентов и фетишей",
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
		ui.notifications.warn(`Не найден: ${talent}`, { permanent: true });
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
