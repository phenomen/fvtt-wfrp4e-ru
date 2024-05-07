if (
	args.opposedTest.result.differenceSL >= 0 &&
	args.opposedTest.result.differenceSL <= 3 &&
	args.opposedTest.result.winner === "attacker"
) {
	this.script.scriptMessage(
		"Каждый, находящийся в радиусе 6 ярдов, получает 1 пункт урона и совершает <strong>трудную (-10) проверку стойкости</strong>, при провале оказываясь @Condition[оглушён]",
		{ blind: true, whisper: ChatMessage.getWhisperRecipients("GM") },
	);
}
