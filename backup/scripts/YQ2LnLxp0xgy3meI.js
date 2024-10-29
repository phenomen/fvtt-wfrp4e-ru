if (args.test.preData.options?.corruption && args.test.failed) {
	args.test?.result?.other.push(
		`Получите дополнительно +1 пункт скверны от ${this.effect.name}`,
	);
}
