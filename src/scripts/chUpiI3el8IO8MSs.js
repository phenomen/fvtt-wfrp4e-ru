if (args.opposedTest.attackerTest.item?.name.includes("Bite")) {
	const woundsGained = args.totalWoundLoss;
	this.script.scriptMessage(`Gains ${woundsGained} Wounds`, {
		whisper: ChatMessage.getWhisperRecipients("GM"),
	});
	this.actor.modifyWounds(woundsGained);
}
