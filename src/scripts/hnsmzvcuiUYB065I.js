this.actor
	.setupSkill(game.i18n.localize("NAME.Cool"), {
		appendTitle: ` - ${this.effect.name}`,
		context: { failure: "May not flee Combat" },
	})
	.then((test) => test.roll());
