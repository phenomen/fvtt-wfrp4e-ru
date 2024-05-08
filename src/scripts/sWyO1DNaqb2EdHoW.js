if (!this.actor.items.getName(game.i18n.localize("NAME.Frenzy"))) {
	// Either frenzy trait or psychology
	// Add Frenzy psychology
	const item = await fromUuid("Compendium.wfrp4e-core.items.DrNUTPeodEgpWTnT");
	const data = item.toObject();
	data.effects[0].disabled = false;
	this.actor.createEmbeddedDocuments("Item", [data], {
		fromEffect: this.effect.id,
	});
}

this.script.scriptMessage(
	`<p><strong>Выпив это зелье, ${this.actor.prototypeToken.name}</strong> становится объектом ярости. Эта ярость длится [[1d10]] раундов и может нескоро закончится. Rounds, and may not be ended sooner.</p>`,
	{ whisper: ChatMessage.getWhisperRecipients("GM"), blind: true },
);
