import { DateTime } from 'luxon'

// MySQL doesn't cast any values, everything is returned as string.
// So, we'll be casting some columns ourselves: NEWDECIMAL to number,
// TINY to boolean, DATE to actual YYYY-MM-D string, etc
export default (field: any, next: any) => {
	if (field.type == 'NEWDECIMAL' && field.length > 0)
		return parseFloat(field.string())
	if (field.type == 'TINY' && field.length == 1) return field.string() == '1'
	if (field.type == 'DATE' && field.length > 0)
		return DateTime.fromISO(field.string()).toISODate()
	if (field.type == 'TIMESTAMP' && field.length > 0) {
		return field.string()
	}
	if (field.type == 'DATETIME' && field.length > 0) return field.string()

	return next()
}
