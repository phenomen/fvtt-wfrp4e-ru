let difficulty = "";
if (this.effect.name.includes("Moderate")) difficulty = "easy";
else if (this.effect.name.includes("Severe")) difficulty = "average";
else difficulty = "veasy";

const test = await this.actor.setupSkill(game.i18n.localize("NAME.Endurance"), {
	context: { failure: `${this.actor.name} умирает от летального исхода` },
	fields: { difficulty },
	skipTargets: true,
	appendTitle: " - летальный исход",
});
await test.roll();
if (test.failed) {
	this.actor.addCondition("dead");
}
