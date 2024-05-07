const current = this.actor.status.fate.value;

this.actor.update({ "system.status.fate.value": current + 1 });

this.script.scriptMessage(
	`<b>${
		this.actor.prototypeToken.name
	}</b> Пункты судьбы увеличены с ${current} до ${current + 1}`,
);
