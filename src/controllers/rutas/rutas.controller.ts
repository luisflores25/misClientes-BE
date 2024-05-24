import { NextFunction, Request, Response } from 'express'
import RutasService from '../../services/internal/rutas.service'

class RutasController {
	public get = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = (await RutasService.findDropdown())! 

			return res.respondSuccess(`Success`, result)
		} catch (e) {
			next(e)
		}
	}
}

export default new RutasController()