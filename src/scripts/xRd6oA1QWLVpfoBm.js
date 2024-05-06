if (!this.actor.has("Night Vision")) {
	const item = await fromUuid("Compendium.wfrp4e-core.items.FmHDbCOy3pH8yKhm");
	const data = item.toObject();
	this.actor.createEmbeddedDocuments("Item", [data], {
		fromEffect: this.effect.id,
	});
}
