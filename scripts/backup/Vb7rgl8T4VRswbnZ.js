this.actor.status.addArmour(
	Number.parseInt(this.item.system.specification.value) || 0,
	{ source: this.effect, damage: this.item.getFlag("wfrp4e", "APdamage") },
);
