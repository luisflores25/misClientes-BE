import SignedInUser = Express.SignedInUser
import {
	ServiceNotFound,
} from '../../common/service-errors'
import RutasDao from '../../db/daos/rutas.dao'

class RutasService {
	rutasDao = new RutasDao()

	/**
	 * Regresa todo el catalogo de rutas para el componente dropdown
	 * @param user
	 */
	async findDropdown() {
		const ruta = this.rutasDao.findDropdown()

		if (!ruta) {
			throw new ServiceNotFound(`No hay rutas`)
		}

		return ruta!
	}
}

export default new RutasService()
