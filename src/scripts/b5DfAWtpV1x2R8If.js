this.script.scriptMessage(
	await this.actor.applyBasicDamage(this.effect.sourceTest.result.damage, {
		suppressMsg: true,
	}),
);
