import { NextFunction, Request, Response } from 'express'
import {
	ServiceForbidden,
	ServiceInvalid,
	ServiceNotFound,
	ServiceResourceExists,
	ServiceServerError,
} from '../common/service-errors'
import { isDevelopmentEnv, isTestingEnv } from '../common/env/environment'

export default (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// There are weird cases in when unhandled exceptions don't
	// use next(), so "res" won't have the responding functions (i.e.
	// respondInvalid, respondNotFound, etc.)
	// We'll use a try/catch block for those slim chances
	try {
		if (err instanceof ServiceServerError) {
			return res.respondServerError(err.message)
		} else if (err instanceof ServiceInvalid) {
			return res.respondInvalid(err.message)
		} else if (err instanceof ServiceForbidden) {
			return res.respondForbidden(err.message)
		} else if (err instanceof ServiceNotFound) {
			return res.respondNotFound(err.message)
		} else if (err instanceof ServiceResourceExists) {
			return res.respondResourceExists(err.message)
		} else {
			return res.respondServerError(
				isDevelopmentEnv() || isTestingEnv()
					? err.message
					: `Unexpected error occurred`
			)
		}
	} catch (e) {
		//TODO Logger
	}
}
