let roll;
if (
	this.actor.has(game.i18n.localize("NAME.Daemonic")) ||
	this.actor.has(game.i18n.localize("NAME.Undead")) ||
	["Гоблин", "Орк", "Нежить"].includes(this.actor.system.details.species.value)
) {
	roll = await new Roll(
		`1d10 + ${this.effect.sourceTest.result.overcast.usage.other.current}`,
	).roll();
} else {
	roll = await new Roll("1d10").roll();
}

roll.toMessage(this.script.getChatData());
await this.actor.applyBasicDamage(roll.total, {
	damageType: game.wfrp4e.config.DAMAGE_TYPE.IGNORE_ALL,
	suppressMsg: true,
});

if (this.actor.has("Нежить") || args.actor.has("Демон")) {
	this.actor.addCondition("ablaze");
}
