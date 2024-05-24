import { DateTime, DateTimeUnit, DurationLike } from 'luxon'
import { Request } from 'express'
import jwt from 'jsonwebtoken'
import { LoginJwt } from './types/login-jwt.type'

/**
 * Returns current date in UTC with "Mysql Datetime" format (yyyy-MM-dd HH:mm:ss).
 * A format can be specified.
 * @returns {string}
 */
export const now = (format?: string) => {
	return DateTime.now()
		.toUTC()
		.toFormat(format ?? 'yyyy-MM-dd HH:mm:ss')
}

/**
 * Will return "today" in PST, converted to UTC, in the form of range. Example:
 * Today in PST is:
 * 	2023-08-01 00:00:00 <-> 2023-08-01 23:59:59
 * This function will return:
 *	2023-08-01 07:00:00 <-> 2023-08-01 06:59:59
 *
 * This will be used mainly to retrieve statistics in the client's timezone (PST)
 * from the DB, where we store information in UTC
 */
export const getTodayPstInUtc = () => {
	const nowPst = DateTime.now().setZone('America/Los_Angeles')

	return {
		from: nowPst.startOf('day').toUTC().toFormat('yyyy-MM-dd HH:mm:ss'),
		to: nowPst.endOf('day').toUTC().toFormat('yyyy-MM-dd HH:mm:ss'),
	}
}

/**
 * Will return "yesterday" in PST, converted to UTC, in the form of range.
 * Similar to {@link getTodayPstInUtc}
 */
export const getYesterdayPstInUtc = () => {
	const yesterdayPst = DateTime.now()
		.setZone('America/Los_Angeles')
		.minus({ day: 1 })

	return {
		from: yesterdayPst.startOf('day').toUTC().toFormat('yyyy-MM-dd HH:mm:ss'),
		to: yesterdayPst.endOf('day').toUTC().toFormat('yyyy-MM-dd HH:mm:ss'),
	}
}

/**
 * Will return "this week" in PST, converted to UTC, in the form of range.
 * Similar to {@link getTodayPstInUtc}
 */
export const getThisWeekPstInUtc = () => {
	const nowPst = DateTime.now().setZone('America/Los_Angeles')

	return {
		from: nowPst.startOf('week').toUTC().toFormat('yyyy-MM-dd HH:mm:ss'),
		to: nowPst.endOf('week').toUTC().toFormat('yyyy-MM-dd HH:mm:ss'),
	}
}

/**
 * Will return "last week" in PST, converted to UTC, in the form of range.
 * Similar to {@link getTodayPstInUtc}
 */
export const getLastWeekPstInUtc = () => {
	const lastWeekPst = DateTime.now()
		.setZone('America/Los_Angeles')
		.minus({ week: 1 })

	return {
		from: lastWeekPst.startOf('week').toUTC().toFormat('yyyy-MM-dd HH:mm:ss'),
		to: lastWeekPst.endOf('week').toUTC().toFormat('yyyy-MM-dd HH:mm:ss'),
	}
}

/**
 * Will return "this month" in PST, converted to UTC, in the form of range.
 * Similar to {@link getTodayPstInUtc}
 */
export const getThisMonthPstInUtc = () => {
	const nowPst = DateTime.now().setZone('America/Los_Angeles')

	return {
		from: nowPst.startOf('month').toUTC().toFormat('yyyy-MM-dd HH:mm:ss'),
		to: nowPst.endOf('month').toUTC().toFormat('yyyy-MM-dd HH:mm:ss'),
	}
}

/**
 * Will return "last month" in PST, converted to UTC, in the form of range.
 * Similar to {@link getTodayPstInUtc}
 */
export const getLastMonthPstInUtc = () => {
	const lastMonthPst = DateTime.now()
		.setZone('America/Los_Angeles')
		.minus({ month: 1 })

	return {
		from: lastMonthPst.startOf('month').toUTC().toFormat('yyyy-MM-dd HH:mm:ss'),
		to: lastMonthPst.endOf('month').toUTC().toFormat('yyyy-MM-dd HH:mm:ss'),
	}
}

export const getTimeAgoInUtc = (timeAgo: DurationLike) => {
	return DateTime.now()
		.setZone('America/Los_Angeles') // perhaps not needed, we'll get date in UTC anyway
		.minus(timeAgo)
		.toUTC()
		.toISO()
}

/**
 * Will return a date in PST, converted to UTC, in the form of range.
 * Similar to {@link getTodayPstInUtc}
 */
export const getDateRangeFromTo = (date: string, range: DateTimeUnit) => {
	const datePst = DateTime.fromJSDate(new Date(date), {
		zone: 'America/Los_Angeles',
	})

	return {
		from: datePst.startOf(range).toUTC().toFormat('yyyy-MM-dd HH:mm:ss'),
		to: datePst.endOf(range).toUTC().toFormat('yyyy-MM-dd HH:mm:ss'),
	}
}

/**
 * Will return a date in PST, converted to a defined timezone, in the form of range.
 * Similar to {@link getDateRangeFromTo}
 */
export const getDateRangeFromToZone = (
	date: string,
	range: DateTimeUnit,
	newZone: string,
	newZoneFormat: string = 'yyyy-MM-dd HH:mm:ss'
) => {
	const datePst = DateTime.fromJSDate(new Date(date), {
		zone: 'America/Los_Angeles',
	})

	return {
		from: datePst.startOf(range).setZone(newZone).toFormat(newZoneFormat),
		to: datePst.endOf(range).setZone(newZone).toFormat(newZoneFormat),
	}
}

/**
 * For a given date in a given format, will return the start and end of that day, converted to UTC
 */
export const getDayInUtc = (dateString: string, format = 'yyyy-MM-dd') => {
	const date = DateTime.fromFormat(dateString, format, {
		zone: 'America/Los_Angeles',
	})

	return {
		from: date.startOf('day').toUTC().toFormat('yyyy-MM-dd HH:mm:ss'),
		to: date.endOf('day').toUTC().toFormat('yyyy-MM-dd HH:mm:ss'),
	}
}

/**
 *
 * @param date Date to convert
 * @param zone Optional date zone, default to 'America/Los_Angeles'
 * @param format Optional date to convert format, default to 'yyyy-MM-dd HH:mm:ss'
 * @returns Date on UTC formatted as 'yyyy-MM-dd HH:mm:ss'
 */
export const convertDateTimeToUTC = (
	date: string,
	zone: string = 'America/Los_Angeles',
	format: string = 'yyyy-MM-dd HH:mm:ss'
) => {
	const convertedDateTime = DateTime.fromFormat(date, format, {
		zone: zone,
	})
		.toUTC()
		.toFormat('yyyy-MM-dd HH:mm:ss')

	return convertedDateTime
}

/**
 * Used to convert dates between timezones
 * @param date date to change timezone
 * @param param1 object to set optional params {
 * original_zone defaults to 'UTC',
 * original_format defaults to 'yyyy-MM-dd HH:mm:ss',
 * new_zone defaults to 'America/Los_Angeles',
 * new_format defaults to 'yyyy-MM-dd HH:mm:ss',
 * }
 * @returns
 */
export const convertDateTimeZone = (
	date: string,
	{
		original_zone = 'UTC',
		original_format = 'yyyy-MM-dd HH:mm:ss',
		new_zone = 'America/Los_Angeles',
		new_format = 'yyyy-MM-dd HH:mm:ss',
	}
) => {
	const convertedDateTime = DateTime.fromFormat(date, original_format, {
		zone: original_zone,
	})
		.setZone(new_zone)
		.toFormat(new_format)

	return convertedDateTime
}

/**
 * Attempts to extract a JWT from req, validates it, makes sure that it
 * corresponds to a user ID, and returns an object with the user id
 * and username
 */
export const getUserFromJWT = (req: Request) => {
	const bearerHeader =
		req.headers['Authorization'] || req.headers['authorization']

	if (!bearerHeader || Array.isArray(bearerHeader)) {
		return false
	}

	const token = bearerHeader.split(' ')[1]

	try {
		// Validate token
		const decoded: any = jwt.verify(token, process.env.JWT_SECRET ?? '')

		if (!decoded.user_id || !decoded.user_email_address) {
			return false
		}

		// Token is valid, return id and username
		return <LoginJwt>{
			user_id: decoded.user_id,
			user_email_address: decoded.user_email_address,
		}
	} catch (e) {
		return false
	}
}

/**
 * Converts MB to B
 * @param megabytes
 */
export const fromMBtoB = (megabytes: number) => megabytes * 1000 * 1000

export const isCastableToNumber = (value: any) => {
	return (
		typeof value === 'number' || (!isNaN(value) && typeof value !== 'boolean')
	)
}

/**
 * Returns the difference between obj1 and obj2 into a new object.
 * @param obj1
 * @param obj2
 */
export const getObjectDifferences = <T>(
	obj1: T,
	obj2: Partial<T>
): Partial<T> => {
	const differences: Partial<T> = {}
	const entries = Object.entries(obj2)
	const keys = entries
		.filter((temp) => temp[1] !== undefined)
		.map((temp) => temp[0]) as Array<keyof T> //To filter only the keys that are being updated
	for (const key of keys) {
		const db_val = obj1[key] as any
		const new_val = obj2[key] as any
		if (db_val != new_val) {
			differences[key] = new_val
		}
	}
	return differences
}

export const getObjectDifferencesList = <T>(
	obj1: T,
	obj2: Partial<T>
): any[] => {
	const differences: any[] = []
	const entries = Object.entries(obj2)
	const keys = entries
		.filter((temp) => temp[1] !== undefined)
		.map((temp) => temp[0]) as Array<keyof T> //To filter only the keys that are being updated
	for (const key of keys) {
		const db_val = obj1[key] as any
		const new_val = obj2[key] as any
		if (db_val != new_val) {
			differences.push(key)
		}
	}
	differences.shift() // To remove the 'id' column from the list
	return differences
}

/**
 * Will return a random number between min and max, both inclusive
 */
export const randomInteger = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Will return true if text is fully numeric or not
 */
export const isNumeric = (text: string) => {
	const numericRegex = /^[0-9]+$/

	// Test the input string against the regular expression
	return numericRegex.test(text)
}

/**
 * It will return whether a string is correctly formatted to be a US phone number.
 * @param phoneNumber Phone Number, ex. 2017813709
 * @returns {boolean}
 */
export const verifyPhoneNumberFormat = (phoneNumber: string): boolean => {
	// I don't believe that the 4th digit has to also be a number between 2-9
	// Will use the same regex from LPs to be consistent with them.
	// OLD Regex: /^[2-9]\d{2}[2-9]\d{2}\d{4}$/
	let phoneNumberRegex = /^[2-9][0-9]{9}$/
	return phoneNumberRegex.test(phoneNumber)
}

/**
 * Taken from the payment-receipt-generator repo, it's used by that process.
 * On that repo the function name was "generate"
 * @param length length required for the string
 * @returns {string}
 */
export const randomString = (length: number): string => {
	let result = ''
	const characters = '0123456789'
	const charactersLength = characters.length
	let counter = 0
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
		counter += 1
	}
	return result
}
