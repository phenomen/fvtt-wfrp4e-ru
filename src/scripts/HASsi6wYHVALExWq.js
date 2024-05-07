const test = await this.actor.setupSkill(game.i18n.localize("NAME.Endurance"), {
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
	context: { failure: "Получен 1 пункт скверны" },
});
await test.roll();

if (test.failed && args.actor.type === "character") {
	let msg = "";
	msg += `<p><b>${this.actor.prototypeToken.name}</b> получает пункт скверны</p>`;
	if (test.result.roll % 11 === 0 || test.result.roll === 100) {
		msg += `<b>${args.actor.prototypeToken.name}</b> получает мутаци (@Table[expandedmutatephys]{физическую} или @Table[expandedmutatemental]{ментальную}), а также получает талант @UUID[Compendium.wfrp4e-core.items.hiU7vhBOVpVI8c7C]{Школа магии (Тзинч)}`;
	}
	this.script.scriptMessage(msg, {
		whisper: ChatMessage.getWhisperRecipients("GM"),
	});
	await this.actor.update({
		"system.status.corruption.value":
			Number.parseInt(args.actor.status.corruption.value) + 1,
	});
}
