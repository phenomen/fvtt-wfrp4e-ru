const location = this.item.system.location.key;
const test = await this.actor.setupCharacteristic("dex", {
	context: { failure: `<strong>${this.effect.name}</strong>: Предмет падает!` },
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
	fields: { difficulty: "average" },
});
await test.roll();

if (location && test.failed) {
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

return test.succeeded
