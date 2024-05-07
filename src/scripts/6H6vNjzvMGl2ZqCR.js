if (args.totalWoundLoss > 0)
	this.script.scriptMessage(
		`<b>Кровь нурглича: ${args.actor.name}</b> должен пройти <b>Трудную (-10) проверку стойкости</b>, при провале которой он получит @UUID[Compendium.wfrp4e-core.items.kKccDTGzWzSXCBOb]{нагноение}`,
		{ whisper: ChatMessage.getWhisperRecipients("GM") },
	);
