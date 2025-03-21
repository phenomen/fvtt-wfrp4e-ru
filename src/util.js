export function setupBabele(dir) {
	if (typeof Babele !== "undefined") {
		game.babele.register({
			module: "ru-wfrp4e",
			lang: "ru",
			dir: dir,
		});
	} else {
		new Dialog({
			title: "Перевод библиотек",
			content:
				"<p>Для перевода библиотек <b>WFRP4e</b> требуется активировать модули <b>Babele и libWrapper</b><p>",
			buttons: {
				done: {
					label: "Хорошо",
				},
			},
		}).render(true);
	}
}

export function translateValue(value, translations) {
	return translations[value.trim()] || value;
}

export function translateList(value, translations) {
	return value
		.split(", ")
		.map((item) => translateValue(item, translations))
		.join(", ");
}

export function parseParentheses(str) {
	const regex = /^(.*)\s+\((.*)\)$/;
	const match = str.match(regex);

	if (match) {
		const main = match[1];
		const sub = match[2];
		return { main: main.trim(), sub: sub.trim() || undefined };
	}

	return { main: str.trim(), sub: undefined };
}
