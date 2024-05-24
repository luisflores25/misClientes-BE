import { Knex } from 'knex'
import Raw = Knex.Raw

export type ColumnDef = {
	id: string

	name_pretty: string
	type: ColumnDef.Type
	values: Raw | { name: string; value: string }[] | null // json -- Raw type is just for inserts
	order: number
}

export namespace ColumnDef {
	export enum Type {
		STRING = 'string',
		ENUM = 'enum',
		DATE = 'date',
		TIMESTAMP = 'timestamp',
		BOOLEAN = 'boolean',
		URL = 'url',
		FILE = 'file',
		ACTION = 'action',
		USER = 'user',
	}
}
