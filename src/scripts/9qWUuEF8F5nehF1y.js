args.item.system.qualities.value = args.item.system.qualities.value.concat([
	{ name: "magical" },
	{ name: "unbreakable" },
]);
args.item.system.damage.value += ` + ${this.effect.sourceActor.system.characteristics.wp.bonus}`;
