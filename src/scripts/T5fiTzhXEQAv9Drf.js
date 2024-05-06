const item = await fromUuid("Compendium.wfrp4e-core.items.rlDZZTj5PXjuRXa2");
const data = item.toObject();
data.system.location.key = this.item.system.location.key;
await this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});

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
