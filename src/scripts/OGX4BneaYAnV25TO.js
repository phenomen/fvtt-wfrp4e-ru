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
	message += `<b>${this.actor.name}</b> восстанавливает пункты здоровья: ${regen}.`;

	if (regen === 10) {
		message += "<br>Также персонаж регенерирует травму.";
	}
} else if (regen >= 8) {
	message += `<b>${this.actor.name}</b> совершает бросок ${regen} и восстанавливает 1 пункт здоровья.`;
	wounds.value += 1;
	if (regen === 10) {
		message += "<br>Также персонаж регенерирует травму.";
	}
} else {
	message += `<b>${this.actor.name}</b> Бросок регенерации ${regen} - никакого эффекта.`;
}

await this.actor.update({ "system.status.wounds": wounds });
this.script.scriptMessage(message, {
	whisper: ChatMessage.getWhisperRecipients("GM"),
});
