if (args.opposedTest.attackerTest.item?.name.includes("Укус")) {
	const woundsGained = args.totalWoundLoss;
	this.script.scriptMessage(`Получите ${woundsGained} пунктов урона`, {
		whisper: ChatMessage.getWhisperRecipients("GM"),
	});
	this.actor.modifyWounds(woundsGained);
}
