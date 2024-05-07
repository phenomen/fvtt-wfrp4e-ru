const location = await game.wfrp4e.tables.rollTable("hitloc", {
	hideDSN: true,
});

this.item.updateSource({ name: `${this.item.name} (${location.description})` });
this.script.scriptMessage(
	`<strong>Зона попадания:</strong> ${location.description}`,
	{ whisper: ChatMessage.getWhisperRecipients("GM") },
);
