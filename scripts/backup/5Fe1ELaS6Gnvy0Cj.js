return args.skill?.name.includes(game.i18n.localize("NAME.Channelling")) || args.type == "channelling" || args.skill?.name == game.i18n.localize("NAME.Charm") || args.skill?.name.includes(`${game.i18n.localize("NAME.Language")} (${game.i18n.localize("SPEC.Magick")})`) || args.type == "cast"