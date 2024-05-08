if (args.test.characteristicKey === "wp") {
	if (args.test.failed) {
		const item = await fromUuid(
			"Compendium.wfrp4e-core.items.AGcJl5rHjkyIQBPP",
		);
		const data = item.toObject();
		this.actor.createEmbeddedDocuments("Item", [data]);

		this.script.scriptMessage(
			`Проверка силы воли провалена, <b>${this.actor.prototypeToken.name}</b> получите @UUID[Compendium.wfrp4e-core.items.AGcJl5rHjkyIQBPP] на [[1d10]] часов`,
		);
	}
}
