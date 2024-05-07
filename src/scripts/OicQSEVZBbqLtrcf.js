const choice = await ItemDialog.create(
	this.actor.itemTypes.critical,
	this.effect.sourceTest.result.overcast.usage.other.current || 1,
	"Выберите травму для лечени (невозможно прикрепить отрубленные части тела)",
);

this.script.scriptMessage(
	`Вылечено <strong>${choice.map((i) => i.name).join(", ")}</strong>`,
);
this.actor.deleteEmbeddedDocuments(
	"Item",
	choice.map((i) => i.id),
);
