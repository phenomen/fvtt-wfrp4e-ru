const skill = `Trade (${this.item.parenthesesText})`;
const currentCareer = this.actor.system.currentCareer;
const existingSkill = this.actor.itemTypes.skill.find((i) => i.name === skill);

if (!currentCareer) return

const inCurrentCareer = currentCareer.system.skills.includes(skill);
if (existingSkill && inCurrentCareer) {
	existingSkill.system.advances.costModifier = -5;
} else {
	currentCareer.system.skills.push(skill);
}
