teeth = await fromUuid("Compendium.wfrp4e-core.items.fBcZhOBn8IpoVqQ1");
teeth = teeth.toObject();

const roll = await new Roll("1d10").roll();
roll.toMessage(this.script.getChatData({ flavor: "зубы потеряны" }));
teeth.system.location.value = `${roll.total} ${teeth.system.location.value}`;
this.actor.createEmbeddedDocuments("Item", [teeth]);
