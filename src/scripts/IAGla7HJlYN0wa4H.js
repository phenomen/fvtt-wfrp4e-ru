if (args.test.characteristicKey === "wp") {
	if (args.test.failed) {
		this.actor.addSystemEffect("convulsions");
		this.script.scriptMessage(
			`Проверка силы воли провалена, <b>${this.actor.prototypeToken.name}</b> получает @Symptom[судороги] на [[1d10]] часов`,
		);
	}
}
