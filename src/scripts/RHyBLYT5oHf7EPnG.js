const skills = this.actor.itemTypes.skill.filter((i) =>
	i.name.includes(game.i18n.localize("NAME.Melee")),
);

const skill = await ItemDialog.create(
	skills,
	1,
	"Выберите навык используемый оружием",
);
const group = game.wfrp4e.utility.extractParenthesesText(skill[0]?.name);
const groupKey = game.wfrp4e.utility.findKey(
	group,
	game.wfrp4e.config.weaponGroups,
);

const weapon = {
	name: this.effect.name,
	type: "weapon",
	img: this.effect.img,
	system: {
		"damage.value": this.actor.system.characteristics.wp.bonus,
		"weaponGroup.value": groupKey || "basic",
		"twohanded.value": ["polearm", "twohanded"].includes(groupKey),
		"reach.value": "average",
		"qualities.value": [{ name: "magical" }],
	},
};

Item.implementation.create(foundry.utils.expandObject(weapon), {
	parent: this.actor,
	fromEffect: this.effect.id,
});
this.script.scriptNotification(
	"Объект создан. Дальнейшая настройка должна быть выполнена вручную в листе элемента",
);
