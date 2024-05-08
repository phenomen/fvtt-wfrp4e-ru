const choice1 = [
	{
		type: "armour",
		name: "Кольчужные чулки",
	},
	{
		type: "armour",
		name: "Кольчуга",
	},
	{
		type: "armour",
		name: "Кольчужный капюшон",
	},
];
const choice2 = [
	{
		type: "armour",
		name: "Кольчужные чулки",
	},
	{
		type: "armour",
		name: "Кольчуга",
	},
	{
		type: "armour",
		name: "Кольчужный капюшон",
	},
	{
		type: "armour",
		name: "Кожаные штаны",
	},
	{
		type: "armour",
		name: "Кожаная шапочка",
	},
	{
		type: "armour",
		name: "Кожаная куртка",
	},
];
const choice3 = [
	{
		type: "armour",
		name: "Латная кираса",
	},
	{
		type: "armour",
		name: "Латные наручи",
	},
	{
		type: "armour",
		name: "Глухой шлем",
	},
	{
		type: "armour",
		name: "Латные поножи",
	},
];

const choice = await new Promise((resolve, reject) => {
	new Dialog({
		title: "Выберите",
		content: `<p>
        Сделайте выбор
        </p>
        <ol>
        <li>Кольчуга</li>
        <li>Кольчуга и кожа</li>
        <li>Латы</li>
        </ol> 
        `,
		buttons: {
			1: {
				label: "Кольчуга",
				callback: () => {
					resolve(choice1);
				},
			},
			2: {
				label: "Кольчуга и кожа",
				callback: () => {
					resolve(choice2);
				},
			},
			3: {
				label: "Латы",
				callback: () => {
					resolve(choice3);
				},
			},
		},
	}).render(true);
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
			ui.notifications.warn(`Не найдено: ${c.name}`, { permanent: true });
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
