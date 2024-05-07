const bite = await fromUuid("Compendium.wfrp4e-core.items.pLW9SVX0TVTYPiPv");
const sense = await fromUuid("Compendium.wfrp4e-core.items.9h82z72XGo9tfgQS");
const biteData = bite.toObject();
const senseData = sense.toObject();

biteData.system.specification.value = 6 - this.actor.characteristics.s.bonus;
senseData.name = senseData.name += " (запах)";
this.actor.createEmbeddedDocuments("Item", [biteData, senseData], {
	fromEffect: this.effect.id,
});
