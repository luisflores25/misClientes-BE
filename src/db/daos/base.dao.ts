import { Knex } from 'knex'
import { mainKnex } from '../db/mainDb'
import { instanceToPlain } from 'class-transformer'
import { readKnex } from '../db/readDb'

export abstract class BaseDao {
	mainKnex: Knex
	readKnex: Knex

	/**
	 * This transactions implementation HAS NOT BEEN TESTED
	 *
	 * TODO - We need to make sure that this implementation indeed works
	 */
	constructor(
		protected readonly knx?: Knex,
		on?: 'main' | 'read'
	) {
		if (knx && on == 'main') {
			this.mainKnex = knx
			this.readKnex = readKnex
		} else if (knx && on == 'read') {
			this.mainKnex = mainKnex
			this.readKnex = knx
		} else {
			this.mainKnex = mainKnex
			this.readKnex = readKnex
		}
	}

	/**
	 * This converts a class instance to Object, and then to JSON string, in order
	 * to be able to be inserted in the DB
	 * @param object
	 */
	objToKnexRaw<T>(object: T) {
		return this.mainKnex.raw('?', [JSON.stringify(instanceToPlain(object))])
	}

	abstract mainTransacting(transaction: Knex.Transaction): BaseDao
	abstract readTransacting(transaction: Knex.Transaction): BaseDao
}
