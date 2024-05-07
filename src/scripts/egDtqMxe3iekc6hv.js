const trait = args.opposedTest.attackerTest.item;
const woundLossEffect = this.item.effects.get("7Amhi75wLv0PvGjd");
if (trait?.name.includes("Укус") && woundLossEffect) {
	args.actor.applyEffect({ effectUuids: woundLossEffect.uuid });
}
