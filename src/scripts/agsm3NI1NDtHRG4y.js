this.actor
	.getActiveTokens()
	.forEach((t) =>
		t.document.update(
			{ texture: this.actor.prototypeToken.texture },
			{ animate: false },
		),
	);
