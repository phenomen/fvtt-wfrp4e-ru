this.actor.createEmbeddedDocuments("ActiveEffect", [
	game.wfrp4e.config.symptomEffects.nausea,
]);
this.script.scriptMessage("Gains @Condition[Nausea] for [[1d10]] hours", {
	whisper: ChatMessage.getWhisperRecipients("GM"),
});
