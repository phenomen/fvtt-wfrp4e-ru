// Remove the miscast if doubles rolled and succeeded
if (
	args.test.succeeded &&
	args.test.result.minormis &&
	args.test.result.roll % 11 === 0
) {
	args.test.result.minormis = undefined;
}
// Decrement the major miscast to minor miscast
else if (
	args.test.succeeded &&
	args.test.result.majormis &&
	args.test.result.roll % 11 === 0
) {
	args.test.result.majormis = undefined;
	args.test.result.minormis = game.i18n.localize("ROLL.MinorMis");
}
