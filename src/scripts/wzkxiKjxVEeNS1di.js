const roll = await new Roll("1d10").roll();
this.script.scriptMessage(
	await this.actor.applyBasicDamage(roll.total, {
		damageType: game.wfrp4e.config.DAMAGE_TYPE.IGNORE_ALL,
		suppressMsg: true,
	}),
);

await this.actor.addCondition("deafened", 3);

const test = await this.actor.setupSkill(game.i18n.localize("NAME.Endurance"), {
	fields: { difficulty: "average" },
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
	context: {
		failure: "Впадает в панику",
		success: "Не подвержен панике",
	},
});
await test.roll();
if (test.failed) {
	this.actor.addCondition("broken");
}
