if (args.totalWoundLoss > 0)
	this.script.scriptMessage(
		`<b>Заразный: ${args.actor.name}</b> должен совершить <b>лёгкую (+40) проверку стойкости</b>, в случае провала получив @UUID[Compendium.wfrp4e-core.items.kKccDTGzWzSXCBOb]{нагноение}`,
		{ whisper: ChatMessage.getWhisperRecipients("GM") },
	);
