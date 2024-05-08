// After consumption, the user gains the Magic Resistance 3 Creature Trait,
// reducing the SL of any spell affecting it by 3.
// This effect lasts for one hour.
const hasMagicResistance = this.actor.has("Устойчивость к магии");

if (hasMagicResistance === undefined) {
	fromUuid("Compendium.wfrp4e-core.items.yrkI7ATjqLPDTFmZ").then((trait) => {
		const traitItem = trait.toObject();
		traitItem.system.specification.value = 2;
		this.actor.createEmbeddedDocuments("Item", [traitItem], {
			fromEffect: this.effect.id,
		});
	});
	this.script.scriptMessage(
		`<p><strong>${this.actor.prototypeToken.name}</strong> получает талант 'устойчивость к магии'. Этот эффект сохраняется в течение 1 часа.</p>`,
		{ whisper: ChatMessage.getWhisperRecipients("GM"), blind: true },
	);
}

if (hasMagicResistance) {
	// Multiple doses may be consumed at once, with each one adding an additional 1 to the Magic Resistance rating and increasing the duration by one hour.
	let msg = `<p><strong>${
		this.actor.prototypeToken.name
	}</strong> повысил свой уровень устойчивости к магии на 1 до ${Number.parseInt(
		hasMagicResistance.system.specification.value,
	)}. Этот эффект сохраняется в течение 1 часа.</p>`;

	// Resist toxic effect
	this.actor
		.setupSkill(game.i18n.localize("NAME.Endurance"), {
			fields: { difficulty: "challenging" },
		})
		.then(async (test) => {
			await test.roll();

			// If they fail ...
			if (!test.succeeded) {
				msg += `<p>Однако начинает сочиться густая ядовитая слизь, покрывающая Смертопасти. Они получают 1 состояние отравления и должны продолжить получать дополнительные состояния @Condition[отравлен]{отравления} в конце каждого раунда.</p>
      <p>Если по истечении 10 раундов они всё ещё живы, эффект заканчивается, а все отравления, полученные из-за ${this.effect.name} удаляются.</p>`;
				this.actor.addCondition("poisoned", 1);
			}
			this.script.scriptMessage(msg, {
				whisper: ChatMessage.getWhisperRecipients("GM"),
				blind: true,
			});
		});
}
