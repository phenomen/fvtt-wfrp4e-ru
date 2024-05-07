// Apply changes when the mask is worn

if (args.equipped) {
	this.actor.createEmbeddedDocuments("ActiveEffect", [
		this.item.effects.contents[1]?.convertToApplied(),
	]);
	this.script.scriptMessage(
		`${this.actor.name} надевает <strong>${this.item.name}</strong>. <br>
      Персонаж не может творить заклинания или молится, пытаясь совершить благословение или чудо.<br>
      Если он носит маску более часа или получает пользу от её способностей, то он подвергается @Corruption[moderate]{сильному оскверняющему воздействию}. 
      `,
		{ whisper: ChatMessage.getWhisperRecipients("GM") },
	);
}

// Notify of lingering effects when mask is removed
else if (!args.equipped) {
	await this.item.effects.contents[0].delete();
	await this.item.update({ name: (this.item.name += " (Used)") });
	this.script.scriptMessage(
		`<strong>${this.item.name}</strong> была снята ${this.actor.name} и теряет свои свойства. Однако эффекты сохраняются в течение [[1d10+4]] дней, после чего их следует удалить вручную.`,
		{ whisper: ChatMessage.getWhisperRecipients("GM") },
	);
}
