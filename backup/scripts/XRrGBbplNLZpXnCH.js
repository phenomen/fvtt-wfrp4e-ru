let item;
const items = [];
item = await fromUuid("Compendium.wfrp4e-core.items.rOV2s6PQBBrhpMOv");
{
	const data = item.toObject();
	items.push(data);
}
item = await fromUuid("Compendium.wfrp4e-core.items.VUJUZVN3VYhOaPjj");
{
	const data = item.toObject();
	data.system.specification.value = 2;
	items.push(data);
}
item = await fromUuid("Compendium.wfrp4e-core.items.GbDyBCu8ZjDp6dkj");
{
	const data = item.toObject();
	items.push(data);
}
item = await fromUuid("Compendium.wfrp4e-core.items.a8MC97PLzl10WocT");
{
	const data = item.toObject();
	items.push(data);
}
item = await fromUuid("Compendium.wfrp4e-core.items.pLW9SVX0TVTYPiPv");
{
	const data = item.toObject();
	data.system.specification.value = 1;
	items.push(data);
}
item = await fromUuid("Compendium.wfrp4e-core.items.pTorrE0l3VybAbtn");
{
	const data = item.toObject();
	data.system.specification.value = 1;
	items.push(data);
}
item = await fromUuid("Compendium.wfrp4e-core.items.fjd1u9VAgiYzhBRp");
{
	const data = item.toObject();
	items.push(data);
}
item = await fromUuid("Compendium.wfrp4e-core.items.mDgEMOoJpi8DkRYb");
{
	const data = item.toObject();
	items.push(data);
}
item = await fromUuid("Compendium.wfrp4e-core.items.AtpAudHA4ybXVlWM");
{
	const data = item.toObject();
	data.system.specification.value = 2;
	items.push(data);
}

this.actor.createEmbeddedDocuments("Item", items, {
	fromEffect: this.effect.id,
});
