const points = this.effect.sourceTest.result.overcast.usage.other.current;

this.actor.update({
	"system.status.fortune.value":
		this.actor.system.status.fortune.value + points,
});

this.script.scriptMessage(`Получены пункты удачи: ${points}`);
