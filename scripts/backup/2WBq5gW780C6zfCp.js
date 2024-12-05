if (args.weapon && this.item.system.usesLocation(args.weapon)) {
	args.bleedingHand = true;
	const success = await this.effect.manualScripts[0].execute({
		actor: this.actor,
	});
	if (!success) {
		args.abort = true;
	}
}
