const item = await fromUuid("Compendium.wfrp4e-core.items.nF5z1OEhpi4t6a6S");
const data = item.toObject();
data.system.location.key = this.item.system.location.key;
if (data.system.location.key[0] === "r") {
	data.system.location.value = "Правая лодыжка";
} else if (data.system.location.key[0] === "l") {
	data.system.location.value = "Левая лодыжка";
}

this.actor.createEmbeddedDocuments("Item", [data], {
	skipLocationValue: true,
	fromEffect: this.effect.id,
});
