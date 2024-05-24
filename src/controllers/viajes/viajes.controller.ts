import { NextFunction, Request, Response } from 'express'
import ViajesService from '../../services/internal/viajes.service'
import { ViajesDto } from './dtos/viajes.dto'
import { GetForTableDto } from './dtos/get-for-table.dto'

class ViajesController {
	public get = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = (await ViajesService.findViaje(1))! //PENDING VIAJE ID

			const mapped = {
                id_ruta_ida: result.id_ruta_ida,
                id_ruta_regreso: result.id_ruta_regreso,
                id_unidad: result.id_unidad,
				tipo_viaje: result.tipo_viaje,
                fecha_ida: result.fecha_ida,
                fecha_regreso: result.fecha_regreso,
                num_pasajeros: result.num_pasajeros
			}

			return res.respondSuccess(`Success`, mapped)
		} catch (e) {
			next(e)
		}
	}

	public getColumns = () => {
		return async (req: Request, res: Response, next: NextFunction) => {
			try {
				const columns = await ViajesService.findColumns()
				
				const newColumns = columns.map((col: any) => {
					if (Array.isArray(col.values) && col.values.length > 0) {
						if (typeof col.values[0] === 'string') {
							col.values = col.values.map((o: any) => ({
								name: o,
								value: o,
							}))
						} else {
							// we're good to go
						}
					}

					return col
				})

				return res.respondSuccess(`Success`, {
					columns: newColumns,
				})
			} catch (e) {
				next(e)
			}
		}
	}

	public getForTable = (type: 'dataset' | 'count') => {
		return async (req: Request, res: Response, next: NextFunction) => {
			try {
				const body = req.body as GetForTableDto

				const enrollments = await ViajesService.findForTable(
					req.user!,
					body,
					type
				)

				return res.respondSuccess(`Success`, {
					dataset: enrollments.dataset,
				})
			} catch (e) {
				next(e)
			}
		}
	}

    public create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const body = req.body as ViajesDto
            const user = req.user!
			const viaje = (await ViajesService.createViaje(body, user))!

			return res.respondSuccess(`Viaje created`, viaje)
		} catch (e) {
			next(e)
		}
	}
}

export default new ViajesController()
