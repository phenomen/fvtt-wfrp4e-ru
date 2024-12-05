if (
	args.test.result.fumble &&
	!this.actor.itemTypes.talent.find((i) => i.name === "Школа магии (огонь)")
) {
	this.actor.addCondition("ablaze");
}
