// Imbibing this substance grants the user the Painless Creature Trait.
const hasPainless = this.actor.has("Невосприимчивость к боли");
if (hasPainless === undefined) {
	const item = await fromUuid("Compendium.wfrp4e-core.items.wMwSRDmgiF2IdCJr");
	const data = item.toObject();
	this.actor.createEmbeddedDocuments("Item", [data], {
		fromEffect: this.effect.id,
	});

	this.script.scriptMessage(
		`<p><strong>${this.actor.prototypeToken.name}</strong> получает черту 'Невосприимчивый к боли'. Этот эффект сохраняется в течение одного часа, после чего он рассеивается, и на персонажа обрушиваются все дополнительные эффекты травм.</p>
    <p>Обратите внимание, что это не мешает пользователю получить травму или умереть от неё. Это просто позволяет ему игнорировать большинство дополнительных эффектов.</p>`,
		{ whisper: ChatMessage.getWhisperRecipients("GM"), blind: true },
	);
}
