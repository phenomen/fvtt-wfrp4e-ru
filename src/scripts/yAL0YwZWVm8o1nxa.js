if (this.actor.hasCondition("dead") && !this.actor.gardenOfCorpses) {
	this.script.scriptMessage(
		"[[3d10]] @UUID[Compendium.wfrp4e-core.actors.T79RqnDOAQLn3I1s]{зомби} поднимается из останков.",
		{ whisper: ChatMessage.getWhisperRecipients("GM") },
	);
	this.actor.gardenOfCorpses = true;
	// local storage is sufficient to prevent multiple messages
}
