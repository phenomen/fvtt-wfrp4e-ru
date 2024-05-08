const choice = await ItemDialog.create(
	this.actor.itemTypes.disease,
	1,
	"Выберите болезнь для лечения (она должна быть естественного происхождения)",
);

this.script.scriptMessage(`Вылечен <strong>${choice[0]?.name}</strong>`);
choice[0].delete();
