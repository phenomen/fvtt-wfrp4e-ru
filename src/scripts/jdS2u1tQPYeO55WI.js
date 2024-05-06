const type = this.item.getFlag("wfrp4e", "breath");

if (type === "cold") {
	const stunned = Math.max(1, Math.trunc(args.totalWoundLoss / 5));
	await args.actor.addCondition("stunned", stunned);
}

if (type === "corrosion") {
	const damageItems = await Dialog.confirm({
		title: this.item.name,
		content: "<p>Damage all Items carried?</p>",
	});
	if (damageItems) {
		let msg = "";
		const weapons = args.actor.itemTypes.weapon.filter((i) => i.isEquipped);
		const armour = args.actor.itemTypes.armour.filter((i) => i.isEquipped);
		const trappings = args.actor.itemTypes.trapping.filter((i) => i.isEquipped);
		for (const item of weapons) {
			if (item.system.properties.qualities.shield) {
				await item.system.damageItem(1, "shield");
			} else {
				await item.system.damageItem(1);
			}
			msg += `<p><strong>${item.name}</strong> damage by 1</p>`;
		}
		for (const item of armour) {
			await item.system.damageItem(1);
			msg += `<p><strong>${item.name}</strong> damage by 1</p>`;
		}
		for (const item of trappings) {
			await item.system.damageItem(1);
			msg += `<p><strong>${item.name}</strong> damage by 1</p>`;
		}
		if (msg) {
			this.script.scriptMessage(msg, { speaker: { alias: args.actor.name } });
		}
	}
}

if (type === "fire") {
	await args.actor.addCondition("ablaze");
}

if (type === "electricity") {
	await args.actor.addCondition("stunned");
}

if (type === "poison") {
	await args.actor.addCondition("poisoned");
}
