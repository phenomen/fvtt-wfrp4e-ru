const token = this.actor.getActiveTokens()[0];
const target = args.data.targets[0];
const weapon = args.weapon;

if (!target || !token) {
	return;
}

const distance = canvas.grid.measureDistances(
	[
		{
			ray: new Ray(
				{ x: token.center.x, y: token.center.y },
				{ x: target.center.x, y: target.center.y },
			),
		},
	],
	{ gridSpaces: true },
)[0];
let currentBand;

for (const band in weapon.range.bands) {
	if (
		distance >= weapon.range.bands[band].range[0] &&
		distance <= weapon.range.bands[band].range[1]
	) {
		currentBand = band;
		break;
	}
}

return [game.i18n.localize("Long Range"), game.i18n.localize("Extreme")].includes(currentBand)
