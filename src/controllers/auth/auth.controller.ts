import { NextFunction, Request, Response } from 'express'
import { ServiceInvalid } from '../../common/service-errors'
import { LoginDto } from './dtos/login.dto'
import AuthService from '../../services/internal/auth.service'

class AuthController {
	public login = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const body = req.body as LoginDto

			const result = await AuthService.auth(body.username, body.password)

			return res.respondSuccess(`Success`, result)
		} catch (e) {
			if (e instanceof ServiceInvalid) {
				return res.respondUnauthorized(`Invalid email address or password`)
			}

			next(e)
		}
	}
}

export default new AuthController()
