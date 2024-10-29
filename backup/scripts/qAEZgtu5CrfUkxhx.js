if (args.test.options.staunchBleeding) {
	if (args.test.succeeded) {
		let staunch = Number(args.test.result.SL) + 1;
		if (args.test.options.fieldDressing && args.test.result.reversed) {
			staunch = Math.min(1, Number(args.test.result.SL)) + 1;
		}
		args.test.result.other.push(
			`<b>${this.actor.name}</b> устраняет <b>${staunch}</b> состояний кровотечения у пациента.`,
		);
	} else if (
		this.actor.characteristics.int.bonus + Number(args.test.result.SL) <
		0
	) {
		args.test.result.other.push(
			"Пациент заражается @UUID[Compendium.wfrp4e-core.items.Item.1hQuVFZt9QnnbWzg]{лёгкой инфекцией}.",
		);
	}
}
