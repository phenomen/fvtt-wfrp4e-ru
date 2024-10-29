const fear = await fromUuid(
	"Compendium.wfrp4e-core.items.Item.pTorrE0l3VybAbtn",
);
const leader = await fromUuid(
	"Compendium.wfrp4e-core.items.Item.vCgEAetBMngR53aT",
);
const fearData = fear.toObject();
const leaderData = leader.toObject();
fearData.system.specification.value =
	this.effect.sourceTest.result.overcast.usage.other.current;
talents = new Array(1 + this.effect.sourceTest.result.overcast.available).fill(
	leaderData,
); // Assume any unused overcast is for war leader
this.actor.createEmbeddedDocuments("Item", [fearData].concat(talents), {
	fromEffect: this.effect.id,
});
