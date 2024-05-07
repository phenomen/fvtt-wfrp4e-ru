// Any Characteristic penalties due to failed Consume Alcohol Tests
// or the state of being Stinking Drunk are eliminated.
await this.actor.removeSystemEffect("consumealcohol1");
await this.actor.removeSystemEffect("consumealcohol2");
await this.actor.removeSystemEffect("consumealcohol3");
await this.actor.removeSystemEffect("stinkingdrunk1");

// The drinker is thereafter Fatigued
// for a number of hours equal to 10 minus their Toughness Bonus —
// nothing but time and rest can eliminate this penalty.
await this.actor.addCondition("fatigued");
const duration =
	10 - Number.parseInt(this.actor.system.characteristics.t.bonus);
this.effect.updateSource({ "duration.rounds": duration });
this.script.scriptMessage(
	`<p><strong>${this.actor.prototypeToken.name}</strong> теряет все штрафы, полученные от употребления алкоголя, и получает состояние усталости на ${duration} часов.</p>`,
	{
		whisper: ChatMessage.getWhisperRecipients("GM"),
		blind: true,
	},
);
