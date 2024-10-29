if (args.test.options.wallcrawler) {
	if (Number.parseInt(args.test.result.SL) < 0 || args.test.failed) {
		if (Number.parseInt(args.test.result.SL) < 0) {
			args.test.result.SL = "+0";
			args.test.result.description = game.i18n.localize("ROLL.MarginalSuccess");
		}
		args.test.result.outcome = "success";
		args.test.result.other.push(
			`<strong>${this.effect.name}</strong>: минимум +0 УУ`,
		);
	}
}
