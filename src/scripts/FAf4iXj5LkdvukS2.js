fromUuid("Compendium.wfrp4e-wom.items.0Xdm4r7l2EwC4fcg").then((item) =>
	Item.create(item.toObject(), {
		fromEffect: this.effect.id,
		parent: this.actor,
	}),
);
