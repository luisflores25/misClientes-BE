import SignedInUser = Express.SignedInUser
import {
	ServiceNotFound,
} from '../../common/service-errors'
import UnidadesDao from '../../db/daos/unidades.dao'

class RutasService {
	unidadesDao = new UnidadesDao()

	/**
	 * Regresa todo el catalogo de unidades para dropdown
	 */
	async findDropdown() {
		const ruta = this.unidadesDao.findDropdown()

		if (!ruta) {
			throw new ServiceNotFound(`No hay unidades`)
		}

		return ruta!
	}
}

export default new RutasService()
