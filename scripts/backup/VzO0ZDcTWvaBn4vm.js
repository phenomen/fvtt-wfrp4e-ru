if (
	args.test.preData.skillName?.includes(game.i18n.localize("NAME.Language")) ||
	args.test instanceof CastTest
) {
	if (Number.parseInt(args.test.result.SL) > 0 || args.test.succeeded) {
		if (Number.parseInt(args.test.result.SL) > 0) {
			args.test.result.SL = "-0";
			args.test.result.description = game.i18n.localize("ROLL.MarginalFailure");
		}
		args.test.result.outcome = "failure";
		args.test.result.other.push(
			`<strong>${this.effect.name}</strong>: Максимум -0 УУ`,
		);
	}
}
