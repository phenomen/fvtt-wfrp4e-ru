let msg = "";

let i_gain = (await new Roll("1d10").roll()).total;

if (args.actor.characteristics.i.value <= 0) {
	i_gain += (await new Roll("2d10").roll()).total;
}

msg = `<b>${this.actor.prototypeToken.name}</b> gains ${i_gain} Initiative`;

const newValue = i_gain + args.actor.characteristics.i.modifier;

this.actor.update({ "system.characteristics.i.modifier": newValue });

const hitloc = await game.wfrp4e.tables.rollTable("hitloc");

const value = hitloc.result;
const desc = hitloc.description;

this.effect.updateSource({ "flags.wfrp4e.location": value });

msg += ` as eyes push out of their ${desc}`;

this.script.scriptMessage(msg);
