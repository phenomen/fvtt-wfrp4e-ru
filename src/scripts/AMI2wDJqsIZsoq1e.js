if (
	args.opposedTest.result.differenceSL >= 0 &&
	args.opposedTest.result.differenceSL <= 2 &&
	args.opposedTest.result.winner === "attacker"
) {
	this.script.scriptMessage(
		`Испускает облако дурнопахнущего чёрного порошка. Активируйте <strong>штраф харизмы</strong>, воздействующий @UUID[${this.actor.uuid}].`,
		{ blind: true, whisper: ChatMessage.getWhisperRecipients("GM") },
	);
}
