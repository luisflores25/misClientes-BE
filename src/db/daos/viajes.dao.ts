import { BaseDao } from './base.dao'
import { Knex } from 'knex'
import { SortDir } from '../../common/types/sort-dir.type'
import { Viaje } from '../types/viaje.type'
import { loadEnvFile } from '../../common/env/dotenv'
import SignedInUser = Express.SignedInUser
import { ColumnDef } from '../types/column-def.type'

export default class ViajesDao extends BaseDao {
	mainTransacting(transaction: Knex.Transaction): ViajesDao {
		return new ViajesDao(transaction, 'main')
	}

	readTransacting(transaction: Knex.Transaction): ViajesDao {
		return new ViajesDao(transaction, 'read')
	}


	async findById(id: number, mustBeEnabled?: boolean) {
		const q = this.mainKnex<Viaje>('viajes').where('id', id).first()

		return q
	}

	async findColumns(){
		loadEnvFile()
		const q = await this.mainKnex('information_schema.columns')
		.select('COLUMN_NAME')
		.where('TABLE_NAME', "viaje")
		.andWhere('TABLE_SCHEMA', process.env.MYSQL_DB);

		return q
	}

	async findAllForTable(
		user_id: number,
		columnsDef: ColumnDef[],
		page: number,
		perPage: number,
		sortBy: string,
		sortDir: SortDir,
		columnsSearch: {
			name: string
			value: string
			type: ColumnDef.Type
		}[],
		rangeSearch: {
			name: string
			start: string | null
			end: string | null
			type: ColumnDef.Type
		}[],
		columnsBlank: string[],
		columnsNotBlank: string[],
		columnsExact: string[],
		type: 'dataset' | 'count',
		filter?: string
	) {
		const q = this.buildSelectWithColumns(
			this.readKnex,
			columnsDef
		)
		q.limit(perPage)
			.groupBy(`viajes.id`)
			.offset((page - 1) * perPage)

		/**
		 * Depending on "type", it's the query we will be calculating here:
		 *  - If type=dataset, we will run the query to get all results, plus to count all records in the DB,
		 *  		because those are the queries that run faster
		 *	- If type=count, we will run the query to count results with this specific search, because that
		 *			query takes longer if using statements such as LIKE
		 */
		if (type == 'dataset') {
			// This is the result of current query (including all constraints)
			const dataset = await q

			return {
				dataset,
			}
		}

		return {
			dataset: null,
		}
	}

	private buildSelectWithColumns(
		knex: Knex,
		columnsDef: ColumnDef[]
	) {
		const q = knex<Viaje>()
		return q
	}

	async create(viaje: Viaje, user: SignedInUser) {
        viaje.creado_por = user.id;
		const [id] = await this.mainKnex<Viaje>('viajes').insert(viaje)

		return this.findById(id)
	}

}
