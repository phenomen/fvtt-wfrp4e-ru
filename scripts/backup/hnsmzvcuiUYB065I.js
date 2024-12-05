this.actor
	.setupSkill(game.i18n.localize("NAME.Cool"), {
		appendTitle: ` - ${this.effect.name}`,
		context: { failure: "Не может сбежать из боя" },
	})
	.then((test) => test.roll());
