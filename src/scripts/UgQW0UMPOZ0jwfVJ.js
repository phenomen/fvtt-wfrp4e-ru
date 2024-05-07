const current = this.actor.status.fortune.value;

this.actor.update({ "system.status.fortune.value": 1 + current });

this.script.scriptMessage(
	`<b>${
		this.actor.prototypeToken.name
	}</b> Пункты удачи увеличены с ${current} на ${1 + current}`,
);
