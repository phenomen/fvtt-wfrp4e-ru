const symptoms = {
	convulsions: "Convulsions",
	coughsandsneezes: "Coughs and Sneezes",
	fever: "Fever",
	flux: "Flux",
	nausea: "Nausea",
};

const roll = await new Roll(
	`max(0, 1d10 - ${this.actor.characteristics.wp.bonus})`,
).roll();
roll.toMessage(this.script.getChatData());

const choices = await ItemDialog.create(
	ItemDialog.objectToArray(symptoms),
	roll.total,
	"Choose Symptoms",
);

if (choices.length) {
	const symptomEffects = duplicate(game.wfrp4e.config.symptomEffects);
	const added = [];
	for (const choice of choices) {
		const symptom = symptomEffects[choice.id];
		symptom.origin = this.effect.uuid;
		added.push(symptom);
	}
	this.actor.createEmbeddedDocuments("ActiveEffect", added);
} else {
	this.effect.delete();
}
