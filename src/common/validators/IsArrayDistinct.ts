import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator'

/**
 * {@Link https://github.com/typestack/class-validator/issues/592}, will check that
 * a given property is an array, and that all elements are unique. If it's an
 * array of objects, uniqueness will be checked against a property name
 */
export function IsArrayDistinct(
	property?: string,
	validationOptions?: ValidationOptions
) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isArrayDistinct',
			target: object.constructor,
			propertyName,
			options: validationOptions,
			validator: {
				validate(value: any): boolean {
					if (Array.isArray(value)) {
						let distinct: any[] = []

						if (property) distinct = [...new Set(value.map((v) => v[property]))]
						else distinct = [...new Set(value)]

						return distinct.length == value.length
					}

					return false
				},

				defaultMessage(validationArguments?: ValidationArguments): string {
					return `${validationArguments?.property} must not contain duplicate entries`
				},
			},
		})
	}
}
