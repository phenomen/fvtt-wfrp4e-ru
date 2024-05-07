if (!args.ward) {
	args.ward = this.effect.getFlag("wfrp4e", "ward") || 0;
	if (args.wardRoll >= args.ward && args.ward > 3) {
		const newWard = Math.max(3, args.ward - 1);
		this.script.scriptMessage(`<strong>Оберег</strong> улучшен до ${newWard}`);
		this.effect.setFlag("wfrp4e", "ward", newWard);
	}
}
