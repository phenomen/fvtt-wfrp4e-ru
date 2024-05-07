await this.actor.modifyWounds(this.actor.system.characteristics.t.bonus * 3);
this.script.scriptMessage(
	`Вылечено ${this.actor.system.characteristics.t.bonus * 3} пунктов здоровья`,
);

this.actor.hasCondition("bleeding")?.delete();
this.actor.hasCondition("fatigued")?.delete();
