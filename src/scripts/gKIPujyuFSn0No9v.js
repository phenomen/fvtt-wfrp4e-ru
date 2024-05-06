for (const e of this.item.effects.contents) {
	e.update({ disabled: false });
}
this.script.scriptNotification("Reset Powers");
