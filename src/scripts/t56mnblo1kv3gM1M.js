return args.skill?.name.includes("Melee (Basic)") || (args.type === "weapon" && args.item?.system.weaponGroup.value === "basic");
