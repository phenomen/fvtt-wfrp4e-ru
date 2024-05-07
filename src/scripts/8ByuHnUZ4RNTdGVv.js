const strLoss = Math.ceil(CONFIG.Dice.randomUniform() * 10);
const tghLoss = Math.ceil(CONFIG.Dice.randomUniform() * 10);

if (!this.actor.has("Нежить") && !this.actor.has("Демон")) {
	this.actor
		.setupSkill(game.i18n.localize("NAME.Cool"), {
			appendTitle: ` - ${this.effect.name}`,
			fields: { difficulty: "average" },
			context: { failure: `Потеря ${strLoss} силы и ${tghLoss} выносливости` },
		})
		.then(async (test) => {
			await test.roll();
			if (test.failed) {
				this.actor.update({
					"system.characteristics.s.initial":
						this.actor.system.characteristics.s.initial - strLoss,
					"system.characteristics.t.initial":
						this.actor.system.characteristics.t.initial - tghLoss,
				});
			}
		});
} else {
	this.script.scriptNotification(
		`<strong>${this.actor.name}</strong> иммунен к ${this.effect.name}`,
	);
}
