if (args.test.characteristicKey === "wp") {
	if (args.test.failed) {
		this.actor.createEmbeddedDocuments("ActiveEffect", [
			game.wfrp4e.config.symptomEffects.malaise,
		]);
		this.script.scriptMessage(
			`Проверка силы воли провалена, <b>${this.actor.prototypeToken.name}</b> получает @Condition[слабость] на [[1d10]] часов`,
			{ whisper: ChatMessage.getWhisperRecipients("GM") },
		);
	}
}
