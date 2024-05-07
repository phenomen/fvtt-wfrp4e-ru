const effects = foundry.utils.deepClone(
	this.item.effects.contents.filter((e) => e.active),
);

effects.splice(effects.length - 1);

if (effects.length === 0) {
	return this.script.scriptNotification("Все эффекты были использованы. Сбросьте, чтобы снова выбрать силу.")
}
const choice = await ItemDialog.create(effects, 1, "Выберите получаемую силу");

if (choice[0]) {
	choice[0].update({ disabled: true });
	const effect = choice[0].convertToApplied();
	effect.name += ` (${this.effect.name})`;
	this.actor.createEmbeddedDocuments("ActiveEffect", [effect]);
}
