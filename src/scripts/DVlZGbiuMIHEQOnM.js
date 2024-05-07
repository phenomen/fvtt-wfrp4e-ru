if (this.actor.getFlag("wfrp4e", "isAttached")) {
	const roll = await new Roll("1d10").roll();
	await roll.toMessage(this.script.getChatData());
	if (roll.total === 9 || roll.total === 10) {
		this.script.scriptMessage(
			`<strong>${
				this.actor.name
			}</strong> прикреплённый к <strong>${this.actor.getFlag(
				"wfrp4e",
				"isAttached",
			)}</strong> объедается и отпадает.`,
		);
		await this.actor.unsetFlag("wfrp4e", "isAttached");
	}
}
