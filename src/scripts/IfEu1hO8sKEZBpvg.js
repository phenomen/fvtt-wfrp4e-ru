const value = Number.parseInt(this.item.specification.value);
const name = this.actor.prototypeToken.name;

if (game.user.isGM && game.user.targets.size) {
	game.user.targets.forEach((t) => {
		t.actor.applyFear(value, name);
	});
	game.user.updateTokenTargets([]);
} else {
	game.wfrp4e.utility.postFear(value, name);
}
