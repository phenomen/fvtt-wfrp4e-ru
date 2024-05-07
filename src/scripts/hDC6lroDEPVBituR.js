const test = await this.actor.setupSkill(game.i18n.localize("NAME.Endurance"), {
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
});
await test.roll();

if (test.failed) {
	this.actor.update({
		"system.status.corruption.value":
			Number.parseInt(this.actor.status.corruption.value) + 1,
	});
	this.script.scriptMessage("Получите пункт скверны", {
		whisper: ChatMessage.getWhisperRecipients("GM"),
	});
	if (test.result.roll % 11 === 0 || test.result.roll === 100) {
		this.script.scriptMessage(
			"<strong>Неудача</strong>: немедленно получите 1 @Table[mutatemental]{ментальную мутацию}. Также персонаж не может выполнять краткосрочных целей в течение следующих [[1d10]] недель.",
			{ whisper: ChatMessage.getWhisperRecipients("GM") },
		);
	}
}
