this.script.scriptMessage(
	await this.actor.applyBasicDamage(8, {
		damageType: game.wfrp4e.config.DAMAGE_TYPE.IGNORE_AP,
		suppressMsg: true,
	}),
);
