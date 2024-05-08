const i_gain = (await new Roll("2d10").roll()).total;
let fel_gain = 0;
if (args.actor.characteristics.fel.value <= 0) {
	fel_gain += (await new Roll("2d10").roll()).total;
}

let msg = `<b>${this.actor.prototypeToken.name}</b> получает ${i_gain} интеллекта`;

if (fel_gain) msg += ` и ${fel_gain} харизмы`;

const newInt = i_gain + args.actor.characteristics.int.modifier;
const newFel = fel_gain + args.actor.characteristics.fel.modifier;

args.actor.update({
	"system.characteristics.int.modifier": newInt,
	"system.characteristics.fel.modifier": newFel,
});

this.script.scriptMessage(msg);
