const sourceActor = this.effect.sourceActor;
const damage = args.totalWoundLoss;
const tb = sourceActor.system.characteristics.t.bonus;
args.abort = `<strong>${this.effect.name}</strong>: Damage applied to ${sourceActor.name}`;

const message = await sourceActor.applyBasicDamage(damage - tb, {
	damageType: game.wfrp4e.config.DAMAGE_TYPE.IGNORE_AP,
	suppressMsg: true,
});

this.script.scriptMessage(message.replace(`${tb} TB`, `${tb} × 2 TB`));
args.abort = true;
