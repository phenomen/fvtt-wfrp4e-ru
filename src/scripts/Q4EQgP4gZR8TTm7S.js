let penalty = 0;
if (args.item?.system.attackType) {
	penalty -= 30;
}
if (args.actor.has("Второе зрение", "talent")) penalty += 10;

args.prefillModifiers.modifier += penalty;
