if (
	args.opposedTest.defenderTest.actor.Species.toLowerCase().includes("skaven")
) {
	args.addImpact = true;
	args.opposedTest.result.other.push("Действует на скавенов");
}
