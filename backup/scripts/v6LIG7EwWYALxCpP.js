return !this.effect.getFlag("wfrp4e", "trained")?.includes("Артистизм") || (!args.skill?.name.includes(game.i18n.localize("NAME.Entertain")) && !args.skill?.name.includes(game.i18n.localize("NAME.Perform")) && !args.skill?.name.includes(game.i18n.localize("NAME.Play")))
