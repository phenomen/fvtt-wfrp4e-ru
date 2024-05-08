const caster = this.effect.sourceActor;

this.actor.modifyWounds(caster.system.characteristics.fel.bonus);

this.script.scriptMessage(
	`Вылечены пункты здоровья: ${caster.system.characteristics.fel.bonus}`,
);
