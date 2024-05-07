const broken = this.actor.hasCondition("broken");
const item = await fromUuid(
	"Compendium.wfrp4e-core.items.Item.IAWyzDfC286a9MPz",
);

if (
	broken &&
	!broken.getFlag("wfrp4e", "blasted-mind") &&
	!this.actor.has(item.name)
) {
	await broken.delete();
	this.actor.createEmbeddedDocuments("Item", [item], {
		fromEffect: this.effect.id,
	});
	this.script.scriptNotification(
		`Удален ${broken.name}, добавлена ${item.name} на (${Math.ceil(
			CONFIG.Dice.randomUniform() * 10,
		)} раундов)`,
	);
}
