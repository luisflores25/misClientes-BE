import {
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
	ValidatorConstraintInterface,
	ValidatorConstraint,
} from 'class-validator'

/**
 * Custom decorator that will validate that a field is greater or equal
 * than another field
 */

@ValidatorConstraint({ name: 'isEqualOrGreater', async: false })
class IsEqualOrGreaterConstraint implements ValidatorConstraintInterface {
	validate(
		value: any,
		validationArguments?: ValidationArguments
	): Promise<boolean> | boolean {
		return isEqualOrGreater(value, validationArguments)
	}

	defaultMessage(validationArguments?: ValidationArguments): string {
		const [relatedPropertyName] = validationArguments!.constraints

		return `$property must be equal or greater than ${relatedPropertyName}`
	}
}

export function IsEqualOrGreater(
	property: string,
	validationOptions?: ValidationOptions
) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isEqualOrGreater',
			target: object.constructor,
			propertyName,
			options: validationOptions,
			constraints: [property],
			validator: IsEqualOrGreater,
		})
	}
}

export const isEqualOrGreater = (
	value: any,
	validationArguments?: ValidationArguments
) => {
	const [relatedPropertyName] = validationArguments!.constraints
	const relatedValue = (validationArguments!.object as any)[relatedPropertyName]

	return parseInt(value) >= parseInt(relatedValue)
}
