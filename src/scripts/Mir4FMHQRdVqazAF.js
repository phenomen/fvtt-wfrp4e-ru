const actorSize =
	game.wfrp4e.config.actorSizeNums[args.actor.details.size.value];
const attackerSize =
	game.wfrp4e.config.actorSizeNums[args.attacker.details.size.value];

if (attackerSize > actorSize) {
	let msg = `<b>Атака языком</b>: ${args.actor.prototypeToken.name} теперь @Condition[обездвижен]`;
	await args.actor.addCondition("entangled");
	if (actorSize <= 2) {
		msg += "и @Condition[обездвижен]";
	}
	this.script.scriptMessage(msg, {
		speaker: { alias: args.attacker.prototypeToken.name },
	});
}
