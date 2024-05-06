return !(this.actor.attacker && (args.skill?.name.includes("Рукопашный бой (основное)") || (args.type === "weapon" && args.item?.system.weaponGroup.value === "basic")))
