let group;
const item = await fromUuid(
	"Compendium.wfrp4e-core.items.Item.5hH73j2NgPdsLCZN",
);
const data = item.toObject();

if (this.item.name.includes("(")) {
	group = this.item.parenthesesText;
} else {
	group = await ValueDialog.create("Введите ненависть к группе", "Ненависть к группе");

	this.item.updateSource({
		name: `${this.item.name} (${group})`,
		"system.tests.value": this.item.system.tests.value.replace("к группе", group),
	});
	this.effect.updateSource({ name: `${this.effect.name} (${group})` });
}

data.name = data.name.replace("Target", group);
await this.actor.createEmbeddedDocuments("Item", [data], {
	fromEffect: this.effect.id,
});
