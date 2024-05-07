if (args.totalWoundLoss >= 1) {
	const roll = await new Roll("1d10").roll();
	await roll.toMessage(this.script.getChatData());
	if (roll.total === 9) {
		this.script.scriptMessage(
			`Два @UUID[Compendium.wfrp4e-eis.actors.iDy8SDTwJSlCzZMl]{голубых ужаса Тзинча} вырываются, раздирая плоть вопящего ${this.actor.name}, убивая носителя.`,
			{ whisper: ChatMessage.getWhisperRecipients("GM") },
		);
	}
}
