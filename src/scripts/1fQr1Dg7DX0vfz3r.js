const healed = Number.parseInt(this.effect.sourceTest.result.SL);
this.actor.modifyWounds(healed);
this.script.scriptMessage(`Вылечено ${healed} пунктов здоровья`);
