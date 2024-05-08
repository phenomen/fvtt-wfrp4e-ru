const location = `${
	Math.ceil(CONFIG.Dice.randomUniform() * 2) === 2 ? "r" : "l"
}Arm`;

if (location === "lArm") {
	this.script.scriptNotification("Выпала левая");
} else if (location === "rArm") {
	this.script.scriptNotification("Выпала правая");
}

this.effect.updateSource({ "flags.wfrp4e.location": location });

if (location) {
	const dropped = this.actor.itemTypes.weapon.filter(
		(i) => i.isEquipped & i.system.usesHands.includes(location),
	);

	if (dropped.length) {
		this.script.scriptNotification(
			`Dropped ${dropped.map((i) => i.name).join(", ")}!`,
		);
		for (const weapon of dropped) {
			await weapon.system.toggleEquip();
		}
	}
}

const roll = await new Roll("1d10").roll();

roll.toMessage(
	this.script.getChatData({ flavor: `${this.effect.name} (длительность)` }),
);

this.effect.updateSource({ "duration.rounds": roll.total });
