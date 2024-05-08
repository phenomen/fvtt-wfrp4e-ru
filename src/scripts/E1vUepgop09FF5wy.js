if (this.actor.system.status.advantage.value === 0) {
	return this.script.scriptNotification("Не хватает преимуществ!", "error")
}

const hatred = await fromUuid(
	"Compendium.wfrp4e-core.items.Item.aE3pyW20Orvdjzj0",
);
const frenzy = await fromUuid(
	"Compendium.wfrp4e-core.items.Item.yRhhOlt18COq4e1q",
);

if (this.actor.system.status.advantage.value >= 3) {
	this.script.scriptNotification(`Добавлено ${frenzy.name}`);
	this.actor.setAdvantage(0);
	this.actor.createEmbeddedDocuments("Item", [frenzy]);
} else if (this.actor.system.status.advantage.value >= 1) {
	const data = hatred.toObject();
	data.system.specification.value = "противники в ближнем бою";
	this.script.scriptNotification(`Добавлено ${hatred.name}`);
	this.actor.setAdvantage(0);
	this.actor.createEmbeddedDocuments("Item", [data]);
}
