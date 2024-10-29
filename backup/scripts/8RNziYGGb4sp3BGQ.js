if (!args.test.weapon?.name.includes("Драконье пламя")) {
	args.test.result.misfire = game.i18n.localize("Misfire");
	args.test.result.misfireDamage = (0, eval)(
		Number.parseInt(args.test.result.roll.toString().split("").pop()) +
			args.test.weapon.system.Damage,
	);
}
