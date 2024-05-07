if (args.test.spell?.getFlag("wfrp4e", "boonOfTzeentch")) {
	if (
		args.test.result.minormis ||
		args.test.result.majormis ||
		args.test.result.catastrophicmis
	) {
		this.script.scriptMessage(
			`<strong>${this.effect.name}</strong> с отвращением покидает разум персонажа и стирается из его гримуара!`,
		);
		this.effect.sourceItem.delete();
	}
}
