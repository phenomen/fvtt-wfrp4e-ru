return !(["cast", "channelling"].includes(args.type) && this.actor.hasCondition("fatigued"))
