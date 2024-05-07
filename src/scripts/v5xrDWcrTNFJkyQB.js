const choice1 = [
	{
		type: "skill",
		name: "Стрельба (луки)",
		diff: {
			system: {
				advances: {
					value: 10,
				},
			},
		},
	},
	{
		type: "weapon",
		name: "Длинный лук",
	},
	{
		type: "ammunition",
		name: "Стрела",
	},
];
const choice2 = [];

const choice = await Dialog.wait({
	title: "Опции",
	content: `<p>
    Добавить опцию?
    </p>
    <ol>
    <li>Стрельба (луки) +10 и длинный лук с 12 стрелами</li>
    </ol> 
    `,
	buttons: {
		1: {
			label: "Да",
			callback: () => {
				return choice1;
			},
		},
		2: {
			label: "Нет",
			callback: () => {
				return choice2;
			},
		},
	},
});

const updateObj = this.actor.toObject();
const items = [];
for (const c of choice) {
	let existing;
	if (c.type === "skill") {
		existing = updateObj.items.find(
			(i) => i.name === c.name && i.type === c.type,
		);
		if (existing && c.diff?.system?.advances?.value) {
			existing.system.advances.value += c.diff.system.advances.value;
		}
	}

	if (!existing) {
		let item = await game.wfrp4e.utility.find(c.name, c.type);
		if (item) {
			item = item.toObject();
			equip(item);
			items.push(mergeObject(item, c.diff || {}));
		} else
			ui.notifications.warn(`Не найдено: ${talent}`, { permanent: true });
	}
}
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
