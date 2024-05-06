this.script.scriptMessage(
	await this.actor.applyBasicDamage(
		10 + Number.parseInt(this.effect.sourceTest.result.SL),
		{ damageType: game.wfrp4e.config.DAMAGE_TYPE.IGNORE_AP },
	),
);
