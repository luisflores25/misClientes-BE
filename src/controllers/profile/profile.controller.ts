import { NextFunction, Request, Response } from 'express'
import ProfileService from '../../services/internal/profile.service'

class ProfileController {
	public get = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = (await ProfileService.findProfile(req.user!))!

			const mapped = {
				username: result.usuario,
				first_name: result.nombre,
				email_address: result.email,
				gender: result.genero,
				dob: result.fecha_nacimiento
			}

			return res.respondSuccess(`Success`, mapped)
		} catch (e) {
			next(e)
		}
	}
}

export default new ProfileController()
