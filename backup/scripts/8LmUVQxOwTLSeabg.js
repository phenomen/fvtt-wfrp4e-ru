return args.data.targets.length > 0 || !args.weapon?.system.qualities.value.find(i => i.name === "shield") // Should count even if they don't have the skill
