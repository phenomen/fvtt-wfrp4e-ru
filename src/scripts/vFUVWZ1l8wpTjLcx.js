if (!this.actor.has(game.i18n.localize("NAME.Daemonic"))) return

const caster = this.effect.sourceActor;
if (caster) {
	const wp = caster.system.characteristics.wp;
	if (this.actor.system.characteristics.wp.value >= wp.value) {
		this.script.scriptNotification("Цель обладает более высокой силой воли. Эффекта нет");
		return
	}
	this.actor.applyBasicDamage(wp.bonus, {
		damageType: game.wfrp4e.config.DAMAGE_TYPE.IGNORE_ALL,
	});
}
