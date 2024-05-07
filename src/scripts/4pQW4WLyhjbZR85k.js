const test = await this.actor.setupSkill(game.i18n.localize("NAME.Endurance"), {
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
	fields: { difficulty: "average" },
	context: { failure: "Получен 1 пункт скверны" },
});
await test.roll();
if (test.failed && this.actor.type === "character") {
	this.actor.update({
		"system.status.corruption.value":
			Number.parseInt(this.actor.status.corruption.value) + 1,
	});
	this.script.scriptMessage("Получен пункт скверны", {
		whisper: ChatMessage.getWhisperRecipients("GM"),
	});
}
