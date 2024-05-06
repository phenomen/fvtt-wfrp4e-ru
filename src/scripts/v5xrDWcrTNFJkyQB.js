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
		name: "Longbow",
	},
	{
		type: "ammunition",
		name: "Arrow",
	},
];
const choice2 = [];

const choice = await Dialog.wait({
	title: "Option",
	content: `<p>
    Add Option?
    </p>
    <ol>
    <li>Ranged (Bow) +10 and a Longbow with 12 Arrows</li>
    </ol> 
    `,
	buttons: {
		1: {
			label: "Yes",
			callback: () => {
				return choice1;
			},
		},
		2: {
			label: "No",
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
			ui.notifications.warn(`Could not find ${talent}`, { permanent: true });
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
