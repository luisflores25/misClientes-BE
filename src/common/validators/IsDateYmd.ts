import {
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
	ValidatorConstraintInterface,
	ValidatorConstraint,
} from 'class-validator'

/**
 * Custom decorator that will validate that field has a date in YYYY-MM-DD format
 */

@ValidatorConstraint({ name: 'isDateYmd', async: false })
class IsDateYmdConstraint implements ValidatorConstraintInterface {
	validate(
		value: any,
		validationArguments?: ValidationArguments
	): Promise<boolean> | boolean {
		return isDateYmd(value)
	}

	defaultMessage(validationArguments?: ValidationArguments): string {
		return `$property must be in a YYYY-MM-DD format`
	}
}

export function IsDateYmd(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'isDateYmd',
			target: object.constructor,
			propertyName,
			options: validationOptions,
			validator: IsDateYmdConstraint,
		})
	}
}

export const isDateYmd = (value: any) => {
	return (
		typeof value === 'string' &&
		/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])$/.test(value)
	)
}
