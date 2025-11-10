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
// import { loadScripts } from "./scripts.js";
import { parseParentheses, setupBabele, translateList, translateValue } from "./util.js";

export async function initTranslation() {
	setupBabele("compendium");
	// loadScripts();

	if (typeof Babele !== "undefined") {
		game.babele.registerConverters({
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

			convertCareerClass: (careerClass) => {
				if (!careerClass) return;
				return translateValue(careerClass, translatedCareerClass);
			},

			convertCareerSkills: (list) => {
				if (!list) return;
				if (Array.isArray(list)) {
					return translateCareerItems(list, "skill", translatedSkillSpec);
				}
				if (list.list) {
					return translateTemplateItems(list, "skill", translatedSkillSpec);
				}
				return list;
			},

			convertCareerTalents: (list) => {
				if (!list) return;
				if (Array.isArray(list)) {
					const result = translateCareerItems(list, "talent", translatedTalentSpec);

					return result;
				}
				if (list.list) {
					const result = translateTemplateItems(list, "talent", translatedTalentSpec);

					return result;
				}
				return list;
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

			convertTableResults: (results, translations) => {
				return results.map((data) => {
					let result = data;
					if (translations) {
						const translation =
							translations[data._id] || translations[`${data.range[0]}-${data.range[1]}`];
						if (translation) {
							if (translation.name) {
								result = foundry.utils.mergeObject(result, translation, {
									translated: true,
								});
							} else {
								result = foundry.utils.mergeObject(
									result,
									foundry.utils.mergeObject({ description: translation }, { translated: true })
								);
							}
						}
					}
					if (result.documentUuid) {
						const text = game.babele.translateField(
							"name",
							foundry.utils.parseUuid(result.documentUuid).collection.collection,
							{ name: result.name }
						);
						if (text) {
							return foundry.utils.mergeObject(
								result,
								foundry.utils.mergeObject({ name: text }, { translated: true })
							);
						}
						return result;
					}
					return result;
				});
			},
		});
	}
}

function translateDocument(name, type, pack, specs) {
	let translation = game.babele.translate(pack, { name: name, type: type }, true);

	if (translation?.name) {
		return translation;
	}

	const words = parseParentheses(name);

	translation = game.babele.translate(pack, { name: words.main, type: type }, true);

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
		translation = translateDocument(item.name, "skill", pack.metadata.id, translatedSkillSpec);

		if (translation?.name) break;
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
	const packs = game.wfrp4e.tags.getPacksWithTag([
		"trait",
		"talent",
	]);

	let translation;

	for (const pack of packs) {
		translation = translateDocument(item.name, item.type, pack.metadata.id, translatedTalentSpec);

		if (translation?.name) break;
	}

	if (translation) {
		const specification = item.system?.specification;
		if (specification?.value && typeof specification.value === "string") {
			specification.value =
				translateValue(specification.value, translatedTalentSpec) || specification.value;
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
		translation = translateDocument(item.name, "career", pack.metadata.id, undefined);

		if (translation?.name) break;
	}

	if (translation) {
		foundry.utils.mergeObject(item, translation);

		const { class: careerClass, skills, talents } = item.system || {};

		if (careerClass?.value) {
			careerClass.value = translateValue(careerClass.value, translatedCareerClass);
		}

		if (skills) {
			item.system.skills = translateCareerItems(skills, "skill", translatedSkillSpec);
		}

		if (talents) {
			item.system.talents = translateCareerItems(talents, "talent", translatedTalentSpec);
		}
	}

	return item;
}

function translateSpell(item) {
	const packs = game.wfrp4e.tags.getPacksWithTag([
		"spell",
		"prayer",
	]);

	let translation;

	for (const pack of packs) {
		translation = translateDocument(item.name, item.type, pack.metadata.id, undefined);

		if (translation?.name) break;
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
		[
			"weapon",
			"armour",
			"container",
			"money",
		]
	);

	let translation;

	for (const pack of packs) {
		translation = translateDocument(item.name, item.type, pack.metadata.id, undefined);

		if (translation?.name) break;
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
			translation = translateDocument(item, type, pack.metadata.id, specs);

			if (translation?.name) break;
		}

		return translation?.name || item;
	});
}

function translateTemplateItems(list, type, specs) {
	if (!list.list) return;

	const packs = game.wfrp4e.tags.getPacksWithTag(type);

	return {
		list: list.list.map((element) => {
			if (!element.name) return element;

			if (translatedExceptions[element.name]) {
				element.name = translatedExceptions[element.name];
				return element;
			}

			let translation;
			for (const pack of packs) {
				translation = translateDocument(element.name, type, pack.metadata.id, specs);
				if (translation?.name) {
					break;
				}
			}

			if (translation?.name) {
				element.name = translation.name;
			}

			return element;
		}),
	};
}

function translateEffects(effects) {
	if (Array.isArray(effects) && effects?.length > 0) {
		return effects.map((effect) => translateEffect(effect));
	}
	return effects;
}

function translateEffect(item) {
	const packs = game.wfrp4e.tags.getPacksWithTag([
		"trait",
		"talent",
		"spell",
	]);

	let translation;

	for (const pack of packs) {
		translation = translateDocument(item.name, "effect", pack.metadata.id, translatedTalentSpec);

		if (translation?.name) break;
	}

	if (translation) {
		item.name = translation.name || item.name;
	} else if (translatedExceptions[item.name]) {
		item.name = translatedExceptions[item.name];
	}

	return item;
}
