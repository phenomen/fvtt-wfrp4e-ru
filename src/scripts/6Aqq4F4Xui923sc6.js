// Imbibing this substance grants the user the Painless Creature Trait.
const hasColdBlooded = this.actor.has("Холодная кровь");
if (hasColdBlooded === undefined) {
	const item = await fromUuid("Compendium.wfrp4e-core.items.mCh1KK9jomwFZcLB");
	const data = item.toObject();
	this.actor.createEmbeddedDocuments("Item", [data], {
		fromEffect: this.effect.id,
	});

	this.script.scriptMessage(
		`<p><strong>${this.actor.prototypeToken.name}</strong> получает черту Холодная кровь и может перевернуть все проваленные проверки, основанные на силе воли.</p>
  <p>Если персонаж оказывается застигнут врасплох, это состояние не исчезает с первого раза, когда должно было быть снято (обычно это происходит в конце раунда или в случае нападения на персонажа).</p>`,
		{ whisper: ChatMessage.getWhisperRecipients("GM"), blind: true },
	);
}
