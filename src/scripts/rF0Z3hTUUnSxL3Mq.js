const armour = (
	await fromUuid("Compendium.wfrp4e-core.items.VUJUZVN3VYhOaPjj")
).toObject();
const bite = (
	await fromUuid("Compendium.wfrp4e-core.items.pLW9SVX0TVTYPiPv")
).toObject();
const fear = (
	await fromUuid("Compendium.wfrp4e-core.items.pTorrE0l3VybAbtn")
).toObject();
const nightVision = (
	await fromUuid("Compendium.wfrp4e-core.items.FmHDbCOy3pH8yKhm")
).toObject();
const tracker = (
	await fromUuid("Compendium.wfrp4e-core.items.ClOlztW6hH8rslbp")
).toObject();
const weapon = (
	await fromUuid("Compendium.wfrp4e-core.items.AtpAudHA4ybXVlWM")
).toObject();

armour.name = "Броня (шкура)";
armour.system.specification.value = 2;
bite.system.specification.value = 3;
fear.system.specification.value = 2;
weapon.system.specification.value = 4;
let items = [armour, bite, fear, nightVision, tracker, weapon];

const belligerent = (
	await fromUuid("Compendium.wfrp4e-core.items.GbDyBCu8ZjDp6dkj")
).toObject(); //{Belligerent}
const bestial = (
	await fromUuid("Compendium.wfrp4e-core.items.AGcJl5rHjkyIQBPP")
).toObject(); //{Bestial}
const big = (
	await fromUuid("Compendium.wfrp4e-core.items.a8MC97PLzl10WocT")
).toObject(); //{Big}
const blessed = (
	await fromUuid("Compendium.wfrp4e-core.items.5muSFXd6oc760uVj")
).toObject(); //{Blessed (Ulric)}
const champion = (
	await fromUuid("Compendium.wfrp4e-core.items.4mF5Sp3t09kZhBYc")
).toObject(); //{Champion}
const die = (
	await fromUuid("Compendium.wfrp4e-core.items.UsJ2uIOOtHA7JqD5")
).toObject(); //{Die Hard}
const fast = (
	await fromUuid("Compendium.wfrp4e-core.items.9MjH4xyVrd3Inzak")
).toObject(); //{Fast}
const frenzy = (
	await fromUuid("Compendium.wfrp4e-core.items.yRhhOlt18COq4e1q")
).toObject(); //{Frenzy}
const immunity = (
	await fromUuid("Compendium.wfrp4e-core.items.IAWyzDfC286a9MPz")
).toObject(); //{Immunity to Psychology}
const regenerate = (
	await fromUuid("Compendium.wfrp4e-core.items.SfUUdOGjdYpr3KSR")
).toObject(); //{Regenerate}
const size = (
	await fromUuid("Compendium.wfrp4e-core.items.8slW8CJ2oVTxeQ6q")
).toObject(); //{Size (Large)}

blessed.system.specification.value = "Ульрик";
size.system.specification.value = "большой";

const optional = [
	belligerent,
	bestial,
	big,
	blessed,
	champion,
	die,
	fast,
	frenzy,
	immunity,
	regenerate,
	size,
];

const chosen = await ItemDialog.create(
	optional,
	"unlimited",
	"Выберите опциональные черты",
);

items = items.concat(chosen || []);
this.script.scriptNotification(`Добавлено ${items.map((i) => i.name).join(", ")}`);
this.actor.createEmbeddedDocuments("Item", items, {
	fromEffect: this.effect.id,
});
