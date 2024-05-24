import {
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
	ValidatorConstraintInterface,
	ValidatorConstraint,
} from 'class-validator'

/**
 * Custom decorator that will validate that field has a date in YYYY-MM-DD HH:MM:SS format
 */

@ValidatorConstraint({ name: 'isDateYmdHms', async: false })
class IsDateYmdConstraint implements ValidatorConstraintInterface {
	validate(
		value: any,
		validationArguments?: ValidationArguments
	): Promise<boolean> | boolean {
		return isDateYmdHms(value)
	}

	defaultMessage(validationArguments?: ValidationArguments): string {
		return `$property must be in a YYYY-MM-DD HH:MM:SS format`
	}
}

export function IsDateYmdHms(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isDateYmdHms',
			target: object.constructor,
			propertyName,
			options: validationOptions,
			validator: IsDateYmdConstraint,
		})
	}
}

export const isDateYmdHms = (value: any) => {
	return (
		typeof value === 'string' &&
		/^(?:\d{4}-(?:0[1-9]|1[0-2])-([0-2][0-9]|3[01]) (?:[01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9])$/.test(
			value
		)
	)
}
