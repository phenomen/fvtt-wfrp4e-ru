let damage = this.effect.sourceTest.result.damage;

const loc = "head";
const APatLoc = this.actor.system.status.armour[loc];

const metalAP = APatLoc.layers.reduce(
	(metal, layer) => (metal += layer.metal ? layer.value : 0),
	0,
);

const APused = Math.max(0, APatLoc.value - metalAP); // remove metal AP at location;

damage -= APused + this.actor.system.characteristics.t.bonus;

let msg = await this.actor.applyBasicDamage(damage, {
	suppressMsg: true,
	damageType: game.wfrp4e.config.DAMAGE_TYPE.IGNORE_ALL,
});
msg += ` (игнорирует ${metalAP} КБ металлической брони ${game.wfrp4e.config.locations[loc]})`;
this.script.scriptMessage(msg);
