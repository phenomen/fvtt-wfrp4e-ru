args.abort = true;
this.script.scriptNotification(
	`Не удается использовать ${
		game.wfrp4e.config.locations[this.effect.getFlag("wfrp4e", "location")]
	}!`,
	"error",
);
