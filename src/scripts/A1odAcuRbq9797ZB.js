const choice1 = [
	{
		type: "skill",
		name: "Рукопашный бой (основное)",
		diff: {
			system: {
				advances: {
					value: 10,
				},
			},
		},
	},
];
const choice2 = [
	{
		type: "skill",
		name: "Рукопашный бой (древковое)",
		diff: {
			system: {
				advances: {
					value: 10,
				},
			},
		},
	},
];

const choice = await Dialog.wait({
	title: "Выбор",
	content: `<p>
    Сделайте свой выбор
    </p>
    <ol>
    <li>Рукопашный бой (основное)</li>
    <li>Рукопашный бой (древковое)</li>
    </ol> 
    `,
	buttons: {
		1: {
			label: "основное",
			callback: () => {
				return choice1;
			},
		},
		2: {
			label: "древковое",
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
			ui.notifications.warn(`Не найден: ${talent}`, { permanent: true });
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
