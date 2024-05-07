if (args.opposedTest.result.hitloc.value === "head") {
	this.script.scriptMessage(
		`<b>${this.actor.prototypeToken.name}</b> получает @Table[crithead]{травму головы}, если она еще не была нанесена.`,
	);
}
