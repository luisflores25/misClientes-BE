import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationArguments,
} from 'class-validator'
import { verifyPhoneNumberFormat } from '../utils'

/*
 * Custom decorator that will validate that field has a phone number format.
 */

export function IsCustomPhoneNumber(
	ifColumn?: string,
	validationOptions?: ValidationOptions
) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			constraints: [ifColumn],
			options: validationOptions,
			validator: IsCustomPhoneNumberConstraint,
		})
	}
}

@ValidatorConstraint({ async: false })
class IsCustomPhoneNumberConstraint implements ValidatorConstraintInterface {
	validate(
		phoneNumber: string,
		args: ValidationArguments
	): Promise<boolean> | boolean {
		return verifyPhoneNumberFormat(phoneNumber)
	}

	defaultMessage(args: ValidationArguments) {
		return '$value should be a valid phone number (10 digits, no country code)'
	}
}
