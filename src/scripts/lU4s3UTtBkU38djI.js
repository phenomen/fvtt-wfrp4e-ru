this.actor.addCondition("entangled");
const msg = `<b>${this.actor.prototypeToken.name}</b> loses 1 Wound and gains 1 <strong>Entangled</strong> Condition.`;
this.script.scriptMessage(msg);
this.actor.modifyWounds(-1);
