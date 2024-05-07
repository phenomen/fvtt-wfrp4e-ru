this.actor.has("Невозмутимость")?.delete();

const roll = await new Roll("1d10").roll();

roll.toMessage(this.script.getChatData());

this.script.scriptNotification(
	`Удалить невозмутимость, добавить ${roll.total} состояний 'в панике'`,
);
this.actor.addCondition("broken", roll.total, {
	"flags.wfrp4e.blasted-mind": true,
});
