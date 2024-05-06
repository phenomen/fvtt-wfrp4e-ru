const chatData = { whisper: ChatMessage.getWhisperRecipients("GM") };
let message = "";

const wounds = duplicate(this.actor.status.wounds);
const regenRoll = await new Roll("1d10").roll();
const regen = regenRoll.total;

if (wounds.value >= wounds.max) return

if (wounds.value > 0) {
	wounds.value += regen;
	if (wounds.value > wounds.max) {
		wounds.value = wounds.max;
	}
	message += `<b>${this.actor.name}</b> regains ${regen} Wounds.`;

	if (regen === 10) {
		message += "<br>Additionally, they regenerate a Critical Wound.";
	}
} else if (regen >= 8) {
	message += `<b>${this.actor.name}</b> rolled a ${regen} and regains 1 Wound.`;
	wounds.value += 1;
	if (regen === 10) {
		message += "<br>Additionally, they regenerate a Critical Wound.";
	}
} else {
	message += `<b>${this.actor.name}</b> Regenerate roll of ${regen} - No effect.`;
}

await this.actor.update({ "system.status.wounds": wounds });
this.script.scriptMessage(message, {
	whisper: ChatMessage.getWhisperRecipients("GM"),
});
