return !(args.skill?.name.includes(game.i18n.localize("NAME.Ranged")) || args.item?.isRanged || args.item?.name === game.i18n.localize("NAME.Charm"))
