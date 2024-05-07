if (args.opposedTest.result.winner === "defender") {
	const roll = Math.ceil(CONFIG.Dice.randomUniform() * 10);
	let msg = `Бросок ${roll}.`;
	if (roll >= 7) {
		msg = `Атакующие удары наносятс с УУ ${roll - 6}.`;
	}
	this.script.scriptMessage(msg, {
		blind: true,
		whisper: ChatMessage.getWhisperRecipients("GM"),
	});
}
