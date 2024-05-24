import { NextFunction, Request, Response } from 'express'
import { getUserFromJWT } from '../common/utils'
import UsersDao from '../db/daos/users.dao'

/**
 * Middleware that checks that a user is signed in with a valid JWT, that
 * corresponds to a user (after signing in with username + password)
 *
 * If the user is signed in, from the controller we'll have access to:
 * req.user.___
 *
 * If changePasswordAllowed = true, it will allow access to routes even
 * when the user is required to change its password (users.change_password = 1)
 */
export const authLoggedUser = () => {
	return async (req: Request, res: Response, next: NextFunction) => {
		let jwtInfo = getUserFromJWT(req)

		if (!jwtInfo || !jwtInfo.user_id || !jwtInfo.user_email_address)
			return res.respondUnauthorized(`You don't have access to this resource 1`)

		const usersDao = new UsersDao()
		const user = await usersDao.findByEmailAddress(
			jwtInfo.user_email_address,
			true
		)

		if (!user) {
			return res.respondUnauthorized(`You don't have access to this resource 2`)
		}

		// Load user in the request
		req.user = {
			id: user.id,
			username: user.usuario,
			name: user.nombre,
			email_address: user.email
		}

		next()
	}
}
