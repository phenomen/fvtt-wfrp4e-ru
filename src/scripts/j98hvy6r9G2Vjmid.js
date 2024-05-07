if (args.totalWoundLoss > 0) {
	args.opposedTest.result.other.push(
		"@Corruption[minor]{Слабое оскверняющее воздействие}",
	);
	this.script.scriptMessage(
		`<strong>${this.effect.name}</strong>: 
    @Corruption[minor]{Слабое оскверняющее воздействие} <br/>
    <strong>${args.actor.prototypeToken.name}</strong> должен пройти 
    <strong>заурядную (+20) проверку сопротивления оскверняющему воздействию.</strong>`,
		{ whisper: ChatMessage.getWhisperRecipients("GM") },
	);
}
