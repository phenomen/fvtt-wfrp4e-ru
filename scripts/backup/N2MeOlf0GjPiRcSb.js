const test = await this.actor.setupCharacteristic("dex", {
	context: { failure: "Роняет предмет" },
});
await test.roll();
