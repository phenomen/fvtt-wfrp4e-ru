const wounds = this.actor.system.status.wounds;
if (wounds.value === 0)
	return this.script.scriptNotification("Не действует при 0 пунктов здоровья", "error")

this.script.scriptNotification(
	`Вылечено ${this.actor.characteristics.t.bonus} пунктов здоровья`,
);
await this.actor.modifyWounds(this.actor.characteristics.t.bonus);
