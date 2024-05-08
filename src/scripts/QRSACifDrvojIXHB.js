if (!this.actor.effects.find((e) => e.isCondition)) {
	return this.script.scriptNotification("Нет состояний у этого актёра")
}

const choice = await ItemDialog.create(
	this.actor.effects.filter((i) => i.isCondition),
	1,
	"Выберите состояние",
);

if (choice[0]) {
	this.actor.removeCondition(choice[0].conditionId);
}
