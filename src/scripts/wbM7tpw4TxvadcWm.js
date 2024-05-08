const items = this.effect.itemTargets;
let msg = "";
for (const item of items) {
	if (item.system.properties.qualities.durable) {
		await item.update({ "system.qualities.value": [] });
		msg += `<p>${item.name} теряет все достоинства</p>`;
	} else {
		msg += `<p>${item.name} рассыпается в пыль!</p>`;
		await item.update({ name: `${item.name} (пыль)` });
	}
}
if (msg) {
	this.script.scriptMessage(msg);
}
