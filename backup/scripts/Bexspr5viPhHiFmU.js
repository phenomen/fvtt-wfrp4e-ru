const fatigued = this.actor.hasCondition("fatigued");
const value = fatigued?.conditionValue || 0;
args.fields.modifier += value * 10;
