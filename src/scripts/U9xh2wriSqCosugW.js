if (args.test.options.stag) {
	if (Number.parseInt(args.test.result.SL) < 0 || args.test.failed) {
		if (Number.parseInt(args.test.result.SL) < 0) {
			args.test.result.SL = "+0";
			args.test.result.description = game.i18n.localize("ROLL.MarginalSuccess");
		}
		args.test.result.outcome = "success";
		args.test.result.other.push(
			`<strong>${this.effect.name}</strong>: Minimum +0 SL`,
		);
	}
}
