ChatMessage.create(
	{
		content: "<em>Говори и мне рассказывай</em>",
		speaker: ChatMessage.getSpeaker({
			token: this.actor.getActiveTokens()[0]?.document,
			actor: this.actor,
		}),
	},
	{ chatBubble: true },
);
