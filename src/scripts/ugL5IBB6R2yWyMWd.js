if (args.totalWoundLoss > 0) {
	const apply = await Dialog.confirm({
		title: this.effect.name,
		content: `<p>Нанести ${this.effect.name} урон? Нападав, должно быть, использовал голые руки или металлическое оружие ближнего боя.`,
	});
	if (apply) {
		let damage = 5 + this.actor.characteristics.wp.bonus;

		const loc =
			args.opposedTest.attackerTest.weapon?.system.usesHands[0] || "rArm";

		const APatLoc = args.opposedTest.attacker.system.status.armour[loc];

		const metalAP = APatLoc.layers.reduce(
			(metal, layer) => (metal += layer.metal ? layer.value : 0),
			0,
		);

		const APused = Math.max(0, APatLoc.value - metalAP); // remove metal AP at location;

		damage -= APused + args.opposedTest.attacker.system.characteristics.t.bonus;

		let msg = await args.opposedTest.attacker.applyBasicDamage(damage, {
			suppressMsg: true,
			damageType: game.wfrp4e.config.DAMAGE_TYPE.IGNORE_ALL,
		});
		msg += ` (игнорирует ${metalAP} металлического КБ ${game.wfrp4e.config.locations[loc]})`;
		this.script.scriptMessage(msg);
	}
}
