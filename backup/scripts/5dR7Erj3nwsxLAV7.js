const characteristics = {
	ws: 35,
	bs: 10,
	s: 25,
	t: 30,
	i: 30,
	ag: 25,
	dex: 0,
	int: 15,
	wp: 35,
	fel: 15,
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
const skillAdvancements = [25, 15, 25, 25, 30, 20, 20];
const talents = [
	"Бдительность",
	"Быстрая реакция",
	"Финт",
	"Воодушевление",
	"Фортуна",
	"Целеустремлённость",
	"Стреляный боец",
	"Командир",
];
const trappings = ["Ручное оружие", "Щит"];
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
		ui.notifications.warn(`Не найден: ${trapping}`, { permanent: true });
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
