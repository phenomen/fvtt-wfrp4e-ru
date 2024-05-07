const actorSize =
	game.wfrp4e.config.actorSizeNums[args.actor.details.size.value];
const attackerSize =
	game.wfrp4e.config.actorSizeNums[args.attacker.details.size.value];

if (attackerSize > actorSize) {
	args.actor.addCondition("prone");
	this.script.scriptMessage(
		`<strong>Удар хвостом</strong>: ${args.actor.prototypeToken.name} теперь <strong>сбит с ног</strong>`,
	);
}
