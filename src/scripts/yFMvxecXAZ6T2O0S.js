if (args.totalWoundLoss >= 1) {
	const roll = await new Roll("1d10").roll();
	await roll.toMessage(this.script.getChatData());
	if (roll.total === 9) {
		this.script.scriptMessage(
			`Два @UUID[Compendium.wfrp4e-eis.actors.cLOGeMqUty61nYB9]{голубых ужаса Тзинча}, когтями раздирая плоть ${this.actor.name}, появляются на свет, убивая своего носителя.`,
			{ whisper: ChatMessage.getWhisperRecipients("GM") },
		);
	}
}
