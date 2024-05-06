let group;
const item = await fromUuid(
	"Compendium.wfrp4e-core.items.Item.5hH73j2NgPdsLCZN",
);
const data = item.toObject();

if (this.item.name.includes("(")) {
	group = this.item.parenthesesText;
} else {
	group = await ValueDialog.create("Enter Hatred Group", "Hatred Group");

	this.item.updateSource({
		name: `${this.item.name} (${group})`,
		"system.tests.value": this.item.system.tests.value.replace("Group", group),
	});
	this.effect.updateSource({ name: `${this.effect.name} (${group})` });
}

data.name = data.name.replace("Target", group);
await this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
