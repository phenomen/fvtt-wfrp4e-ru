if (
	args.totalWoundLoss > 0 &&
	["trait", "weapon"].includes(args.opposedTest.attackerTest.item?.type)
) {
	this.script.scriptMessage(
		`<b>Заразный: ${args.actor.name}</b> должен совершить <b>лёгкую (+40) проверку стойкости</b>, в случае провала получая @UUID[Compendium.wfrp4e-core.items.kKccDTGzWzSXCBOb]{нагноение}`,
		{ whisper: ChatMessage.getWhisperRecipients("GM") },
	);
}
