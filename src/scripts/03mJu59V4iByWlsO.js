// The imbiber immediately
// takes 3 Poisoned Conditions that cannot be resisted at first,
await this.actor.addCondition("poisoned", 3);

// recovers a number of Wounds equal to their Toughness Bonus,
await this.actor.modifyWounds(this.actor.system.characteristics.t.bonus);

// and acquires the Regenerate Creature Trait.
const hasRegenerate = this.actor.has("Регенерация");
if (hasRegenerate === undefined) {
	fromUuid("Compendium.wfrp4e-core.items.SfUUdOGjdYpr3KSR").then((trait) => {
		const traitItem = trait.toObject();
		this.actor.createEmbeddedDocuments("Item", [traitItem], {
			fromEffect: this.effect.id,
		});
	});
}

this.script.scriptMessage(
	`<p><strong>${this.actor.prototypeToken.name}</strong> получает 
    <ul>
      <li>три состояния отравления, которым поначалу невозможно сопротивляться</li>
      <li>восстановление ${this.actor.system.characteristics.t.bonus} пунктов здоровья</li>
      <li>черту регенерация.</li>
    </ul>
    Лишь от Ранальда зависит, опередит ли регенерация отравление.</p>
    <p>Когда все состояния отравления будут удалены, происходит регенерация.</p>`,
	{ whisper: ChatMessage.getWhisperRecipients("GM"), blind: true },
);
