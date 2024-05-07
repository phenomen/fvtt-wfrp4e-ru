if (
	args.opposedTest.attackerTest.item?.isMelee ||
	(args.opposedTest.attackerTest.item &&
		!args.opposedTest.attackerTest.item.name.includes("Стрельба"))
) {
	const choice = await Dialog.wait({
		title: this.effect.name,
		content: `<p>Нанести урон с помощью <strong>${this.effect.name}</strong> атакующему?`,
		buttons: {
			yes: {
				label: "Да",
				callback: () => {
					return true;
				},
			},
			no: {
				label: "Нет",
				callback: () => {
					return false;
				},
			},
		},
	});

	if (choice) {
		this.script.scriptMessage(
			await args.attacker.applyBasicDamage(
				this.actor.system.characteristics.wp.bonus,
				{
					damageType: game.wfrp4e.config.DAMAGE_TYPE.IGNORE_AP,
					suppressMsg: true,
				},
			),
		);
	}
}
