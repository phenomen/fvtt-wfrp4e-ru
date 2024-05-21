const talents = await Promise.all(["Ярость", "Устойчивость к магии"].map(game.wfrp4e.utility.findTalent))
this.actor.createEmbeddedDocuments("Item", talents, {fromEffect : this.effect.id})