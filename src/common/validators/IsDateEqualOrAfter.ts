import {
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
	ValidatorConstraintInterface,
	ValidatorConstraint,
} from 'class-validator'
import { DateTime } from 'luxon'

/**
 * Custom decorator that will validate that a field with a YYYY-MM-DD date, is
 * equal or after another date field
 */

@ValidatorConstraint({ name: 'isDateYmd', async: false })
class IsDateEqualOrAfterConstraint implements ValidatorConstraintInterface {
	validate(
		value: any,
		validationArguments?: ValidationArguments
	): Promise<boolean> | boolean {
		return isDateEqualOrAfter(value, validationArguments)
	}

	defaultMessage(validationArguments?: ValidationArguments): string {
		const [relatedPropertyName] = validationArguments!.constraints

		return `$property must be equal or after ${relatedPropertyName}`
	}
}

export function IsDateEqualOrAfter(
	property: string,
	validationOptions?: ValidationOptions
) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isDateEqualOrAfter',
			target: object.constructor,
			propertyName,
			options: validationOptions,
			constraints: [property],
			validator: IsDateEqualOrAfterConstraint,
		})
	}
}

export const isDateEqualOrAfter = (
	value: any,
	validationArguments?: ValidationArguments
) => {
	const [relatedPropertyName] = validationArguments!.constraints
	const relatedValue = (validationArguments!.object as any)[relatedPropertyName]

	const d1 = DateTime.fromISO(value)
	const d2 = DateTime.fromISO(relatedValue)

	return d1 >= d2
}
