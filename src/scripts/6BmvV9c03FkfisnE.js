// Apply changes when the mask is worn

if (args.equipped) {
	this.actor.createEmbeddedDocuments("ActiveEffect", [
		this.item.effects.contents[1]?.convertToApplied(),
	]);
	this.script.scriptMessage(
		`${this.actor.name} использует <strong>${this.item.name}</strong>. <br>
      При провале проверки на оскверняющее воздействие получите +1 пункт скверны, который необходимо добавить вручную.<br> При ношении маски больше 1 часа или ином полезном использовании одного из её свойств персонаж подвергается @Corruption[moderate]{сильному оскверняющему воздействию} 
      `,
		{ whisper: ChatMessage.getWhisperRecipients("GM") },
	);
}

// Notify of lingering effects when mask is removed
else if (!args.equipped) {
	await this.item.effects.contents[0].delete();
	await this.item.update({ name: (this.item.name += " (Used)") });
	this.script.scriptMessage(
		`<strong>${this.item.name}</strong> была снята с  ${this.actor.name}, свойства маски снимаются. Однако эффекты сохраняют своё действие в течение [[1d10+4]] дней, после чего эффекты необходимо удалить вручную.`,
		{ whisper: ChatMessage.getWhisperRecipients("GM") },
	);
}
