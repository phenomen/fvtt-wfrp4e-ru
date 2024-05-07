const healed = args.totalWoundLoss;

this.script.scriptMessage(
	`<b>this.actor.prototypeToken.name</b> восстанавливает ${healed} пунктов здоровья`,
);

this.actor.modifyWounds(healed);
