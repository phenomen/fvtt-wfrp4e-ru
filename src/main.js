import {
	parseParentheses,
	setupBabele,
	translateList,
	translateValue,
} from "./util.js";

import {
	translatedCareerClass,
	translatedDuration,
	translatedExceptions,
	translatedGender,
	translatedGods,
	translatedHitLocation,
	translatedSkillSpec,
	translatedSpecies,
	translatedSpellDamage,
	translatedSpellDuration,
	translatedSpellRange,
	translatedSpellTarget,
	translatedTalentSpec,
} from "./data.js";

import { loadScripts } from "./scripts.js";

export function initTranslation() {
	setupBabele();
	loadScripts();

	if (typeof Babele !== "undefined") {
		libWrapper.register(
			"ru-wfrp4e",
			"Babele.prototype.loadTranslations",
			patchBabele,
			"OVERRIDE",
		);

		Babele.get().registerConverters({
			convertEffects: (effects) => {
				if (!effects) return;
				return translateEffects(effects);
			},

			convertDuration: (duration) => {
				if (!duration) return;
				return translateValue(duration, translatedDuration);
			},

			convertHitLocation: (hitLocation) => {
				if (!hitLocation) return;
				return translateValue(hitLocation, translatedHitLocation);
			},

			convertCareerClass: (careerClass) => {
				if (!careerClass) return;
				return translateValue(careerClass, translatedCareerClass);
			},

			convertSpellRange: (range) => {
				if (!range) return;
				return translateValue(range, translatedSpellRange);
			},

			convertSpellDuration: (duration) => {
				if (!duration) return;
				return translateValue(duration, translatedSpellDuration);
			},

			convertSpellTarget: (target) => {
				if (!target) return;
				return translateValue(target, translatedSpellTarget);
			},

			convertSpellDamage: (damage) => {
				if (!damage) return;
				return translateValue(damage, translatedSpellDamage);
			},

			convertGods: (gods) => {
				if (!gods) return;
				return translateList(gods, translatedGods);
			},

			convertCareerSkills: (list) => {
				if (!list) return;
				return translateCareerItems(list, "skill", translatedSkillSpec);
			},

			convertCareerTalents: (list) => {
				if (!list) return;
				return translateCareerItems(list, "talent", translatedTalentSpec);
			},

			convertActorGender: (gender) => {
				if (!gender) return;
				return translateValue(gender, translatedGender);
			},

			convertActorSpecies: (species) => {
				if (!species) return;
				return translateValue(species, translatedSpecies);
			},

			convertActorCareerClass: (careerClass) => {
				if (!careerClass) return;
				return translateValue(careerClass, translatedCareerClass);
			},

			convertActorItems: (items) => {
				if (!items) return;

				return items.map((item) => {
					const { name, type } = item;
					if (!name) return item;

					switch (type) {
						case "skill":
							return translateSkill(item);
						case "trait":
						case "talent":
							return translateTrait(item);
						case "spell":
						case "prayer":
							return translateSpell(item);
						case "career":
							return translateCareer(item);
						case "trapping":
						case "weapon":
						case "armour":
						case "container":
						case "money":
							return translateTrapping(item);
						default:
							return item;
					}
				});
			},
		});
	}
}

async function patchBabele(wrapped, ...args) {
	const files = await getTranslationsFiles(this);

	console.log("ru-wfrp4e: Patching Babele");

	if (files.length === 0) {
		console.log(
			`Babele | no compendium translation files found for ${game.settings.get(
				"core",
				"language",
			)} language.`,
		);

		return [];
	}

	const allTranslations = [];
	const loadTranslations = async (collection, urls) => {
		if (urls.length === 0) {
			console.log(`Babele | no translation file found for ${collection} pack`);
		} else {
			const [translations] = await Promise.all([
				Promise.all(
					urls.map((url) =>
						fetch(url)
							.then((r) => r.json())
							.catch((e) => {}),
					),
				),
			]);

			let translation;
			for (const t of translations) {
				if (t) {
					if (translation) {
						translation.label = t.label ?? translation.label;
						if (t.entries) {
							translation.entries = {
								...translation.entries,
								...t.entries,
							};
						}
						if (t.mapping) {
							translation.mapping = {
								...translation.mapping,
								...t.mapping,
							};
						}
					} else {
						translation = t;
					}
				}
			}

			if (translation) {
				console.log(
					`Babele | translation for ${collection} pack successfully loaded`,
				);
				allTranslations.push(
					mergeObject(translation, { collection: collection }),
				);
			}
		}
	};

	for (const metadata of game.data.packs) {
		if (this.supported(metadata)) {
			const collection = this.getCollection(metadata);
			const collectionFileName = encodeURI(`${collection}.json`);
			const urls = files.filter((file) => file.endsWith(collectionFileName));

			await loadTranslations(collection, urls);
		}
	}

	// Handle specific files for pack folders
	for (const file of files.filter((file) =>
		file.endsWith("_packs-folders.json"),
	)) {
		const fileName = file.split("/").pop();

		await loadTranslations(fileName.replace(".json", ""), [file]);
	}

	return allTranslations;
}

async function getTranslationsFiles() {
	if (!game.user.hasPermission("FILES_BROWSE")) {
		return game.settings.get("babele", "translationFiles");
	}

	const directories = [
		"/modules/ru-wfrp4e/compendium",
		"/modules/ru-wfrp4e/compendium/altdorf",
		"/modules/ru-wfrp4e/compendium/archives1",
		"/modules/ru-wfrp4e/compendium/archives2",
		"/modules/ru-wfrp4e/compendium/core",
		"/modules/ru-wfrp4e/compendium/dotr",
		"/modules/ru-wfrp4e/compendium/eis",
		"/modules/ru-wfrp4e/compendium/empire-ruins",
		"/modules/ru-wfrp4e/compendium/gm-toolkit",
		"/modules/ru-wfrp4e/compendium/horned-rat",
		"/modules/ru-wfrp4e/compendium/middenheim",
		"/modules/ru-wfrp4e/compendium/owb1",
		"/modules/ru-wfrp4e/compendium/pbtt",
		"/modules/ru-wfrp4e/compendium/rnhd",
		"/modules/ru-wfrp4e/compendium/salzenmund",
		"/modules/ru-wfrp4e/compendium/starter-set",
		"/modules/ru-wfrp4e/compendium/ua1",
		"/modules/ru-wfrp4e/compendium/ua2",
		"/modules/ru-wfrp4e/compendium/up-in-arms",
		"/modules/ru-wfrp4e/compendium/wom",
		"/modules/ru-wfrp4e/compendium/zoo",
	];

	const files = [];

	for (let i = 0; i < directories.length; i++) {
		try {
			const result = await FilePicker.browse("data", directories[i]);
			for (const file of result.files) {
				files.push(file);
			}
		} catch (err) {
			console.warn(`Babele: ${err}`);
		}
	}

	if (game.user.isGM) {
		game.settings.set("babele", "translationFiles", files);
	}

	return files;
}

function translateItem(name, type, pack, specs) {
	let translation = game.babele.translate(
		pack,
		{ name: name, type: type },
		true,
	);

	if (translation?.name) {
		return translation;
	}

	const words = parseParentheses(name);

	translation = game.babele.translate(
		pack,
		{ name: words.main, type: type },
		true,
	);

	if (translation?.name) {
		translation.name =
			words.sub && specs
				? `${translation.name} (${translateValue(words.sub, specs)})`
				: translation.name;
		return translation;
	}

	return undefined;
}

function translateSkill(item) {
	const packs = game.wfrp4e.tags.getPacksWithTag("skill");

	let translation;

	for (const pack of packs) {
		translation = translateItem(
			item.name,
			"skill",
			pack.metadata.id,
			translatedSkillSpec,
		);

		if (translation?.system) break;
	}

	if (translation) {
		foundry.utils.mergeObject(item, translation);
	}

	if (translatedExceptions[item.name]) {
		item.name = translatedExceptions[item.name];
	}

	return item;
}

function translateTrait(item) {
	const packs = game.wfrp4e.tags.getPacksWithTag(["trait", "talent"]);

	let translation;

	for (const pack of packs) {
		translation = translateItem(
			item.name,
			item.type,
			pack.metadata.id,
			translatedTalentSpec,
		);

		if (translation?.system) break;
	}

	if (translation) {
		const specification = item.system?.specification;
		if (specification?.value && typeof specification.value === "string") {
			specification.value =
				translateValue(specification.value, translatedTalentSpec) ||
				specification.value;
		}

		if (Array.isArray(item.effects) && item.effects?.length > 0) {
			item.effects = translateEffects(item.effects);
		}

		foundry.utils.mergeObject(item, translation);
	}

	if (translatedExceptions[item.name]) {
		item.name = translatedExceptions[item.name];
	}

	return item;
}

function translateCareer(item) {
	const packs = game.wfrp4e.tags.getPacksWithTag("career");

	let translation;

	for (const pack of packs) {
		translation = translateItem(
			item.name,
			"career",
			pack.metadata.id,
			undefined,
		);

		if (translation?.system) break;
	}

	if (translation) {
		const { class: careerClass, skills, talents } = item.system || {};

		if (careerClass?.value) {
			careerClass.value = translateValue(
				careerClass.value,
				translatedCareerClass,
			);
		}

		if (skills) {
			item.system.skills = translateCareerItems(
				skills,
				"skill",
				translatedSkillSpec,
			);
		}

		if (talents) {
			item.system.talents = translateCareerItems(
				talents,
				"talent",
				translatedTalentSpec,
			);
		}

		foundry.utils.mergeObject(item, translation);
	}

	return item;
}

function translateSpell(item) {
	const packs = game.wfrp4e.tags.getPacksWithTag(["spell", "prayer"]);

	let translation;

	for (const pack of packs) {
		translation = translateItem(
			item.name,
			item.type,
			pack.metadata.id,
			undefined,
		);

		if (translation?.system) break;
	}

	if (translation) {
		const { range, duration, target, damage, god } = item.system || {};

		if (range?.value) {
			range.value = translateValue(range.value, translatedSpellRange);
		}

		if (duration?.value) {
			duration.value = translateValue(duration.value, translatedSpellDuration);
		}

		if (target?.value) {
			target.value = translateValue(target.value, translatedSpellTarget);
		}

		if (damage?.value) {
			damage.value = translateValue(damage.value, translatedSpellDamage);
		}

		if (god?.value) {
			god.value = translateValue(god.value, translatedGods);
		}

		if (Array.isArray(item.effects) && item.effects?.length > 0) {
			item.effects = translateEffects(item.effects);
		}

		foundry.utils.mergeObject(item, translation);
	}

	return item;
}

function translateTrapping(item) {
	const packs = game.wfrp4e.tags.getPacksWithTag(
		["trapping"],
		["weapon", "armour", "container", "money"],
	);

	let translation;

	for (const pack of packs) {
		translation = translateItem(
			item.name,
			item.type,
			pack.metadata.id,
			undefined,
		);

		if (translation?.system) break;
	}

	if (translation) {
		foundry.utils.mergeObject(item, translation);
	}

	return item;
}

function translateCareerItems(list, type, specs) {
	if (!list) return;

	const packs = game.wfrp4e.tags.getPacksWithTag(type);

	return list.map((element) => {
		const item = element.trim();

		if (translatedExceptions[item]) {
			return translatedExceptions[item];
		}

		let translation;

		for (const pack of packs) {
			translation = translateItem(item, type, pack.metadata.id, specs);

			if (translation?.system) break;
		}

		return translation?.name || item;
	});
}

function translateEffects(effects) {
	if (Array.isArray(effects) && effects?.length > 0) {
		effects.map((effect) => {
			translateEffect(effect);
		});
	}
	return effects;
}

function translateEffect(item) {
	const packs = game.wfrp4e.tags.getPacksWithTag(["trait", "talent", "spell"]);

	let translation;

	for (const pack of packs) {
		translation = translateItem(
			item.name,
			"effect",
			pack.metadata.id,
			translatedTalentSpec,
		);

		if (translation?.name) break;
	}

	if (translation) {
		item.name = translation.name || item.name;
	} else if (translatedExceptions[item.name]) {
		item.name = translatedExceptions[item.name];
	}

	return item;
}
