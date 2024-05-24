import { BaseDao } from './base.dao'
import { Knex } from 'knex'
import { Ruta } from '../types/ruta.type'

export default class RutasDao extends BaseDao {
	mainTransacting(transaction: Knex.Transaction): RutasDao {
		return new RutasDao(transaction, 'main')
	}

	readTransacting(transaction: Knex.Transaction): RutasDao {
		return new RutasDao(transaction, 'read')
	}

    async findDropdown() {
		const q = this.mainKnex<Ruta>('rutas')

		return q
	}
}