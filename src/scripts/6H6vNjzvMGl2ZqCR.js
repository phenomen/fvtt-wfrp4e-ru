if (args.totalWoundLoss > 0)
	this.script.scriptMessage(
		`<b>Blade of Nurglitch: ${args.actor.name}</b> must pass an <b>Difficult (-10) Endurance</b> Test or gain a @UUID[Compendium.wfrp4e-core.items.kKccDTGzWzSXCBOb]{Festering Wound}`,
		{ whisper: ChatMessage.getWhisperRecipients("GM") },
	);
