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
