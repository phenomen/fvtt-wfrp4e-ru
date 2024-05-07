this.actor.createEmbeddedDocuments("ActiveEffect", [
	game.wfrp4e.config.symptomEffects.nausea,
]);
this.script.scriptMessage("Получите @Condition[тошнота]{тошноту} на [[1d10]] часов", {
	whisper: ChatMessage.getWhisperRecipients("GM"),
});
