const talent = this.actor.has("Arcane Magic (Light)", "talent");
const demon = this.actor.has(game.i18n.localize("NAME.Daemonic"));

if (!talent) {
	await this.actor.addCondition("blinded");
}

if (demon) {
	await this.actor.addCondition("stunned");
}
