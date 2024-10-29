if (Number.parseInt(this.item.system.specification.value) > 0) {
	this.actor.system.status.ward.value = Number.parseInt(
		this.item.system.specification.value,
	);
}
