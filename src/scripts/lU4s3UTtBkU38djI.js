this.actor.addCondition("entangled");
const msg = `<b>${this.actor.prototypeToken.name}</b> получает 1 пункт урона, а также  1 состояние <strong>обездвижен</strong>.`;
this.script.scriptMessage(msg);
this.actor.modifyWounds(-1);
