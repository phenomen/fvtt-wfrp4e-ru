const num = this.effect.sourceTest.result.overcast.usage.other.current || 1;

this.actor.addCondition("entangled", num);
