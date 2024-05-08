const specification = this.item.system.specification.value;
let choice = [];

if (!specification || specification === "умение") {
	choice = await ItemDialog.create(
		ItemDialog.objectToArray(
			{
				broken: "приручённый",
				drive: "тяговой",
				entertain: "цирковой",
				fetch: "апорт",
				guard: "сторожевой",
				home: "домашний",
				magic: "приученный к магии",
				mount: "верховой",
				war: "боевой",
			},
			this.effect.img,
		),
		"unlimited",
		"Выберите умения",
	);
} else {
	choice = specification.split(", ").map((i) => {
		return {
			id: i.toLowerCase(),
			name: i,
		};
	});
}

if (choice.length) {
	const changes = foundry.utils.deepClone(this.effect.changes);

	for (const training of choice) {
		switch (training.id) {
			case "broken": {
				const roll = await new Roll("2d10").roll();
				roll.toMessage(this.script.getChatData());
				changes.push({
					value: roll.total,
					mode: 2,
					key: "system.characteristics.fel.modifier",
				});

				if (this.actor.type === "creature") {
					const bestial = this.actor.itemTypes.trait.find(
						(i) => i.name === "Зверь",
					);
					if (bestial) {
						bestial.update({ "system.disabled": true });
					}
				}
				break;
			}

			case "drive":
				break;

			case "Артистизм":
				break;

			case "fetch":
				break;

			case "guard": {
				const territorial = await fromUuid(
					"Compendium.wfrp4e-core.items.Item.JIAe7i7dqTQBu4do",
				);
				await this.actor.createEmbeddedDocuments("Item", [territorial], {
					fromEffect: this.effect.id,
				});
				setProperty(args, "options.keepId", true);
				break;
			}

			case "home":
				break;

			case "magic":
				break;

			case "mount":
				break;

			case "war":
				changes.push({
					value: 10,
					mode: 2,
					key: "system.characteristics.ws.modifier",
				});
				break;
		}
	}
	this.effect.updateSource({
		name: `${this.effect.name} (${choice.map((i) => i.name).join(", ")})`,
		changes,
		"flags.wfrp4e.trained": choice.map((i) => i.id),
	});
	this.item.updateSource({
		"system.specification.value": `${choice.map((i) => i.name).join(", ")}`,
	});
}
