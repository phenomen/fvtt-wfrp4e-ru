const characteristics = {
	ws: 10,
	bs: 0,
	s: 0,
	t: 0,
	i: 10,
	ag: 0,
	dex: 0,
	int: 20,
	wp: 10,
	fel: 15,
};
const skills = ["Концентрация", "Обаяние", "Сценическое искусство (танец)"];
const skillAdvancements = [0, 6, 3];
const talents = ["Привлекательность", "Отвлекающий манёвр", "Имитатор"];
const traits = ["Дезориентация", "Полёт (6)", "Магический дар (простейшие)"];
const trappings = [];
const items = [];
const spells = ["Магические светляки", "Сон"];

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

const traitRegex =
	/(?:,?(.+?)(\+?\d{1,2}\+?)?\s*?(?:\((.+?)\)\s*(\+?\d{1,2})?|,|$))/gm;
for (const trait of traits) {
	const traitMatches = trait.matchAll(traitRegex).next().value;
	const traitName = traitMatches[1];
	const traitVal = traitMatches[2] || traitMatches[4]; // could be match 2 or 4 depending on if there's a specialization
	const traitSpec = traitMatches[3];

	let traitItem;
	try {
		traitItem = await WFRP_Utility.findItem(traitName, "trait");
	} catch {}
	if (!traitItem) {
		ui.notifications.warn(`Не найден: ${trait}`, { permanent: true });
	}
	traitItem = traitItem.toObject();

	if (Number.isNumeric(traitVal)) {
		traitItem.system.specification.value = traitName.includes(
			"Оружие",
			"Рога",
			"Удар хвостом",
			"щупалец",
			"Укус",
		)
			? traitVal - Number.parseInt(characteristicValues[3] / 10)
			: traitVal;
		traitItem.name = `${traitItem.name} ${
			traitSpec ? `(${traitSpec})` : ""
		}`.trim();
	} else traitItem.system.specification.value = traitSpec;

	items.push(traitItem);
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

for (const spell of spells) {
	let spellItem = await game.wfrp4e.utility.findItem(spell);
	if (spellItem) {
		spellItem = spellItem.toObject();

		items.push(spellItem);
	} else {
		ui.notifications.warn(`Не найден: ${spell}`, { permanent: true });
	}
}

updateObj.name = updateObj.name += ` ${this.effect.name}`;

await this.actor.update(updateObj);
this.actor.createEmbeddedDocuments("Item", items);

function equip(item) {
	if (item.type === "armour") item.worn = true;
	else if (item.type === "weapon") item.equipped = true;
	else if (
		item.type === "trapping" &&
		item.trappingType?.value === "clothingAccessories"
	)
		item.worn = true;
}
