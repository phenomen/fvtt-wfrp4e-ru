const tokenImg = ""; // Put path to token image here, inbetween the quotation marks
if (tokenImg) {
	if (this.effect.getFlag("wfrp4e", "transformed")) {
		await this.effect.setFlag("wfrp4e", "transformed", false);
		this.actor.getActiveTokens().forEach((t) =>
			t.document.update({
				texture: { src: this.actor.prototypeToken.texture.src },
			}),
		);
	} else {
		await this.effect.setFlag("wfrp4e", "transformed", true);
		this.actor
			.getActiveTokens()
			.forEach((t) => t.document.update({ texture: { src: tokenImg } }));
	}
} else {
	this.script.scriptNotification(
		"Путь к картинке токена не настроен. Путь должен быть указан в первой строчке этого скрипта.",
		"error",
	);
}
