if (
	!args.test.context.phantasmal &&
	(this.actor.isOpposing || args.test.context.defending) &&
	args.test.result.roll % 11 === 0 &&
	args.test.succeeded &&
	["Язык (магический)", "Уклонение"].includes(args.test.item?.name)
) {
	args.test.context.phantasmal = true; // Flag so items aren't readded if test is edited
	const text = `<strong>${this.effect.name}</strong>: Добавлены нестабильность и оберег`;
	args.test.result.other.push(text);
	this.script.scriptNotification(text);

	const ward = await fromUuid("Compendium.wfrp4e-core.items.Bvd2aZ0gQUXHfCTh");
	const wardData = ward.toObject();
	wardData.system.specification.value = 9;

	const unstable = await fromUuid(
		"Compendium.wfrp4e-core.items.D0ImWEIMSDgElsnl",
	);
	const unstableData = unstable.toObject();
	this.actor.createEmbeddedDocuments("Item", [wardData, unstableData], {
		fromEffect: this.effect.id,
	});
}
