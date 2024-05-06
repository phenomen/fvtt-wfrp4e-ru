ChatMessage.create(
	{
		content: "<em>Speak and be known to me</em>",
		speaker: ChatMessage.getSpeaker({
			token: this.actor.getActiveTokens()[0]?.document,
			actor: this.actor,
		}),
	},
	{ chatBubble: true },
);
