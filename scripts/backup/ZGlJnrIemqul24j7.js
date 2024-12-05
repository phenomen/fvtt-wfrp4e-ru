const infected = await fromUuid(
	"Compendium.wfrp4e-core.items.V0c3qBU1CMm8bmsW",
);
const bite = await fromUuid("Compendium.wfrp4e-core.items.pLW9SVX0TVTYPiPv");
const biteData = bite.toObject();
const infectedData = infected.toObject();

biteData.system.specification.value = 4 - this.actor.characteristics.s.bonus;

this.actor.createEmbeddedDocuments("Item", [biteData, infectedData], {
	fromEffect: this.effect.id,
});
