import { Transform } from 'class-transformer'

export const TransformStringToBoolean = () =>
	Transform(({ value }) => {
		if (value === 'true' || value === true) return true
		if (value === 'false' || value === false) return false
		return value
	})
