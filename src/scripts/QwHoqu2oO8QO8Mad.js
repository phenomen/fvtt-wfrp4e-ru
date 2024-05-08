const content = `<b>${this.effect.name}</b>: Все цели, пораженные <b>${this.actor.prototypeToken.name}</b> получают [[/r 1d10]] урона, изменяемого РВ и КБ.`;

this.script.scriptMessage(content);
