import { NextFunction, Request, Response } from 'express'

/**
 * Middleware to extend the functionality of {@link Response},
 * to be able to respond depending on the status (success,
 * not found, invalid, unauthorized, etc)
 *
 * @param req
 * @param res
 * @param next
 */
export default (req: Request, res: Response, next: NextFunction) => {
	res.respondSuccess = <T>(msg?: String, data?: T) => {
		return res.status(200).send({
			msg: msg ?? null,
			data: data ?? null,
		})
	}

	res.respondNotFound = (error?: string) => {
		return res.status(404).send({
			msg: error,
			data: null,
		})
	}

	res.respondServerError = (error?: string) => {
		return res.status(500).send({
			msg: error,
			data: null,
		})
	}

	res.respondInvalid = (error?: string) => {
		return res.status(400).send({
			msg: error,
			data: null,
		})
	}

	res.respondUnauthorized = (error?: string) => {
		return res.status(401).send({
			msg: error,
			data: null,
		})
	}

	res.respondForbidden = (error?: string) => {
		return res.status(403).send({
			msg: error,
			data: null,
		})
	}

	res.respondResourceExists = (error?: string) => {
		return res.status(409).send({
			msg: error,
			data: null,
		})
	}

	res.respondRetryProcess = (success: boolean, msg: string, data: unknown) => {
		return res
			.status(200)
			.send({ success: success ? 'Success' : 'Failed', data, msg })
	}

	next()
}
