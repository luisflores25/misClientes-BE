export function filter<T extends Record<string, any>>(
	obj: T | undefined,
	includedFields: Array<keyof T>
): Partial<T> {
	const filtered: Partial<T> = {}

	if (obj === undefined) {
		return filtered
	}

	for (const field of includedFields) {
		if (obj.hasOwnProperty(field)) {
			filtered[field] = obj[field]
		}
	}

	return filtered
}
