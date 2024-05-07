if (args.test.result.SL < 0) {
	this.script.scriptMessage(
		`Получено ${Math.abs(args.test.result.SL)} пунктов скверны`,
		{ whisper: ChatMessage.getWhisperRecipients("GM") },
	);
	if (args.test.failed && this.actor.type === "character") {
		this.actor.update({
			"system.status.corruption.value":
				Number.parseInt(this.actor.status.corruption.value) +
				Math.abs(args.test.result.SL),
		});
	}
}
