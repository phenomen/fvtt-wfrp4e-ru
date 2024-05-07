let msg = `<b>${this.actor.prototypeToken.name}</b> теряет 1 пункт здоровья.<br>`;
if (this.actor.status.wounds.value <= 1) {
	msg += `<b>${this.actor.prototypeToken.name}</b> теряет сознания.<br>`;
	await this.actor.addCondition("unconscious");
}
this.script.scriptMessage(msg);
this.actor.modifyWounds(-1);
