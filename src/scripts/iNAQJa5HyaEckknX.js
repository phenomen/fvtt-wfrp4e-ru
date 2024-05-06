const test = await this.actor.setupCharacteristic("wp", {
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
});
await test.roll();

const opposedResult = test.opposedMessages[0]
	?.getOppose()
	?.resultMessage?.getOpposedTest()?.result;

if (opposedResult?.winner === "attacker") {
	const spells = this.actor.itemTypes.spell;
	if (spells.length) {
		const chosen =
			spells[Math.floor(CONFIG.Dice.randomUniform() * spells.length)];
		this.script.scriptMessage(
			`Loses access to <strong>${chosen.name}</strong>`,
		);
		chosen.update({ name: (chosen.name += " (LOST)") });
	}
}
