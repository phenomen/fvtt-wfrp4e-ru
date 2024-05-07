// Apply changes when the mask is worn

if (args.equipped) {
	this.actor.createEmbeddedDocuments("ActiveEffect", [
		this.item.effects.contents[1]?.convertToApplied(),
	]);
	this.script.scriptMessage(
		`${this.actor.name} надевает <strong>${this.item.name}</strong>. <br>
        Персонаж получает +50 к проверкам плавания и может дышать под водой.<br>
        Если персонаж носит маску более часа или извлекает пользу из её способностей, он подвергается @Corruption[moderate]{сильному оскверняющему воздействию}. 
        `,
		{ whisper: ChatMessage.getWhisperRecipients("GM") },
	);
}

// Notify of lingering effects when mask is removed
else if (!args.equipped) {
	await this.item.effects.contents[0].delete();
	await this.item.update({ name: (this.item.name += " (Used)") });
	this.script.scriptMessage(
		`<strong>${this.item.name}</strong> снята с ${this.actor.name} и теряет все свои свойства. Однако эффекты действуют еще [[1d10+4]] дней, послечего их необходимо удалить вручную.`,
		{ whisper: ChatMessage.getWhisperRecipients("GM") },
	);
}
