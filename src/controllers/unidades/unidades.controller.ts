import { NextFunction, Request, Response } from 'express'
import UnidadesService from '../../services/internal/unidades.service'

class UnidadesController {
	public get = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = (await UnidadesService.findDropdown())! 

			return res.respondSuccess(`Success`, result)
		} catch (e) {
			next(e)
		}
	}
}

export default new UnidadesController()
