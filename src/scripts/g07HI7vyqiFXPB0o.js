// A Drinker must take a Difficult (-10) Endurance Test.
const test = await this.actor.setupSkill(game.i18n.localize("NAME.Endurance"), {
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
	fields: { difficulty: "difficult" },
});
await test.roll();
// If they fail, they acquire 2 Poisoned Conditions.
if (test.failed) {
	this.actor.addCondition("poisoned", 2);
	this.script.scriptMessage(
		`<p><strong>${this.actor.prototypeToken.name}</strong> получает 2 состояния @Condition[отравлен].</p>
        <p>Любое существо с чертой 'зверь', кусающее персонажа и наносящее ему урон, больше не укусит его во время столкновения, хотя существо по-прежнему может атаковать иными способами.</p>`,
		{
			whisper: ChatMessage.getWhisperRecipients("GM"),
			blind: true,
		},
	);
}
// If they succeed, for a number of rounds equal to 3+ their SL, they have the Corrosive Blood Creature Trait.
else if (test.succeeded) {
	// Don't attempt to add Corrosive Blood if actor already has it
	const hasCorrosiveBlood = this.actor.has("Едкий ихор");
	if (hasCorrosiveBlood !== undefined) return

	const item = await fromUuid("Compendium.wfrp4e-core.items.M5QSWOYt2Rbv2yxW");
	const data = item.toObject();
	this.actor.createEmbeddedDocuments("Item", [data], {
		fromEffect: this.effect.id,
	});

	const duration = 3 + Number.parseInt(test.result.SL);
	this.script.scriptMessage(
		`<p><strong>${this.actor.prototypeToken.name}</strong> получает черту 'Едкий ихор' на ${duration} раундов.</p>`,
		{ whisper: ChatMessage.getWhisperRecipients("GM"), blind: true },
	);
}
