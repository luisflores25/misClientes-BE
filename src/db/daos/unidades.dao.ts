import { BaseDao } from './base.dao'
import { Knex } from 'knex'
import { Unidad } from '../types/unidad.type'

export default class UnidadesDao extends BaseDao {
	mainTransacting(transaction: Knex.Transaction): UnidadesDao {
		return new UnidadesDao(transaction, 'main')
	}

	readTransacting(transaction: Knex.Transaction): UnidadesDao {
		return new UnidadesDao(transaction, 'read')
	}

    async findDropdown() {
		const q = this.mainKnex<Unidad>('unidades')

		return q
	}
}
