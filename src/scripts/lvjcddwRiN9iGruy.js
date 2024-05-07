const test = await this.actor.setupCharacteristic("t", {
	appendTitle: ` - ${this.effect.name}`,
	fields: { difficulty: "challenging" },
});
await test.roll();

if (test.failed) {
	const ageAdded =
		Math.ceil(CONFIG.Dice.randomUniform() * 10) +
		Math.ceil(CONFIG.Dice.randomUniform() * 10);
	const ws = Math.ceil(CONFIG.Dice.randomUniform() * 10);
	const bs = Math.ceil(CONFIG.Dice.randomUniform() * 10);
	const s = Math.ceil(CONFIG.Dice.randomUniform() * 10);
	const t = Math.ceil(CONFIG.Dice.randomUniform() * 10);
	const ag = Math.ceil(CONFIG.Dice.randomUniform() * 10);
	const dex = Math.ceil(CONFIG.Dice.randomUniform() * 10);

	const currentAge = Number.parseInt(this.actor.system.details.age.value);

	const inline = `<a class="inline-roll" data-tooltip="@TT"><i class="fas fa-dice-d20"></i>@ROLL</a>`;
	const msg = `<p><b>${this.actor.prototypeToken.name}</b> стареет на ${inline
		.replace("@ROLL", ageAdded)
		.replace("@TT", "2d10")} и теряет</p>
      <p>${inline.replace("@ROLL", ws).replace("@TT", "1d10")} <b>Ближний бой</b></p>
      <p>${inline.replace("@ROLL", bs).replace("@TT", "1d10")} <b>Дальний бой</b></p>
      <p>${inline.replace("@ROLL", s).replace("@TT", "1d10")} <b>Сила</b></p>
      <p>${inline.replace("@ROLL", t).replace("@TT", "1d10")} <b>Выносливость</b></p>
      <p>${inline.replace("@ROLL", ag).replace("@TT", "1d10")} <b>Проворство</b></p>
      <p>${inline.replace("@ROLL", dex).replace("@TT", "1d10")} <b>Ловкость</b></p>
 `;
	this.script.scriptMessage(msg);

	const characteristics = duplicate(this.actor.system.characteristics);

	characteristics.ws.initial -= ws;
	characteristics.bs.initial -= bs;
	characteristics.s.initial -= s;
	characteristics.t.initial -= t;
	characteristics.ag.initial -= ag;
	characteristics.dex.initial -= dex;

	this.actor.update({
		"system.characteristics": characteristics,
		"data.details.age.value": ageAdded + currentAge,
	});
}
