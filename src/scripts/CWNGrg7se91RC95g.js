if (args.totalWoundLoss > 0) {
	args.opposedTest.result.other.push(
		"@Corruption[moderate]{Сильное оскверняющее воздействие}",
	);
	this.script.scriptMessage(
		`<strong>${this.effect.name}</strong>: 
      @Corruption[moderate]{Сильное оскверняющее воздействие} <br/>
      <strong>${args.actor.prototypeToken.name}</strong> необходимо пройти проверку 
      <strong>сильного оскверняющего воздействия</strong>`,
		{ whisper: ChatMessage.getWhisperRecipients("GM") },
	);
}
