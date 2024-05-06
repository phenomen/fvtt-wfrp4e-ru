const location = this.item.system.location.key;

if (location) {
	const dropped = this.item.system.weaponsAtLocation;

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
	this.script.getChatData({ flavor: `${this.effect.name} (Duration)` }),
);

this.effect.updateSource({ "duration.rounds": roll.total });
