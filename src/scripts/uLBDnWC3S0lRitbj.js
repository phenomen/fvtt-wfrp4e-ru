const test = await this.actor.setupCharacteristic("int", {
	skipTargets: true,
	appendTitle: ` - ${this.effect.name}`,
});
await test.roll();

const opposedResult = test.opposedMessages[0]
	?.getOppose()
	?.resultMessage?.getOpposedTest()?.result;

if (opposedResult?.winner === "attacker") {
	if (
		test.failed &&
		(test.result.roll % 11 === 0 || test.result.roll === 100)
	) {
		this.actor.addCondition("unconscious");
		await this.actor.update({
			"system.status.corruption.value":
				Number.parseInt(this.actor.status.corruption.value) + 1,
		});
		this.script.scriptMessage("Получен пункт скверны", {
			whisper: ChatMessage.getWhisperRecipients("GM"),
		});
	} else {
		await this.actor.addCondition("stunned", 1 + opposedResult.differenceSL);
	}
} else {
	return false;
}
