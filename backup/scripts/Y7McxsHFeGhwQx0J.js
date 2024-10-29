this.actor.createEmbeddedDocuments(
	"Item",
	[
		expandObject({
			name: "Призрачное пламя",
			type: "weapon",
			img: this.effect.img,
			system: {
				"weaponGroup.value": "throwing",
				"damage.value": "SB + WPB",
				"qualities.value": [{ name: "magical" }],
				equipped: true,
			},
		}),
	],
	{ fromEffect: this.effect.id },
);
