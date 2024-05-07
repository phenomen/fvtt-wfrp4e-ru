const poisoned = this.actor.hasCondition("poisoned");
if (poisoned) {
	this.script.scriptMessage("Невосприимчив к яду");
	poisoned.delete();
}
