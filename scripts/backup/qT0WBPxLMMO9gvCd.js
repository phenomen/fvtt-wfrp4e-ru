if (
	!this.actor.has("Сумеречное зрение") &&
	!this.actor.has("Сумеречное зрение", "talent") &&
	!this.actor.hasCondition("blinded")
) {
	this.actor.addCondition("blinded", 1, { "flags.wfrp4e.nightshroud": true });
}
