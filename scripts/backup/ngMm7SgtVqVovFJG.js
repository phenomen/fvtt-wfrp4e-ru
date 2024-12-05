if (args.test.result.critical && args.test.result.critical !== "Всплеск энергии") {
	args.test.result.other.push(
		`<a class ="table-click critical-roll" data-modifier="20" data-table = "crit${args.test.result.hitloc.result}"><i class="fas fa-list"></i> Удачная костедробилка (+20)</a> (только при выборе магической травмы)`,
	);
}
