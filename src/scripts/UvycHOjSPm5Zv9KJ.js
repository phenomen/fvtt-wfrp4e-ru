const test = await this.actor.setupSkill(game.i18n.localize("NAME.Dodge"), {
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
});
await test.roll();
let baseDamage = "4";
if (test.succeeded) baseDamage = "0";

const damage =
	this.effect.sourceItem.system.computeSpellDamage(baseDamage, true) +
	Number.parseInt(this.effect.sourceTest.result.SL);

this.script.scriptMessage(
	await this.actor.applyBasicDamage(damage, { suppressMsg: true }),
);
this.actor.addCondition("ablaze");
