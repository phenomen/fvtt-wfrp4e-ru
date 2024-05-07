const currentCareer = this.actor.system.currentCareer;
if (!currentCareer) {
	return;
}

const talents = [
	"Эфирный унисон",
	"Школа магии",
	"Магия Хаоса (Тзинч)",
	"Быстрые руки",
	"Безупречная дикция",
	"Магическое чутье",
	"Простейшая магия",
	"Второе зрение",
	"Боевой маг",
	"Ведьма!",
].filter((t) => !currentCareer.system.talents.includes(t));

currentCareer.system.talents = currentCareer.system.talents.concat(talents);
