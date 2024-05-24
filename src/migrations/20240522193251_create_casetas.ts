import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('casetas', table => {
		table
			.increments('id')
			.unsigned()
			.primary()
			.notNullable()

		table
			.string('nombre_caseta', 100)
			.notNullable()
		table
			.decimal('precio')
			.notNullable()
            .defaultTo(0.0)
        table
			.integer('creado_por')
			.unsigned()
			.nullable()
		table
			.integer('actualizado_por')
			.unsigned()
			.nullable()
		table
			.timestamp('fecha_creado')
			.notNullable()
			.defaultTo(knex.raw('CURRENT_TIMESTAMP'))
		table
			.timestamp('fecha_actualizado')
			.nullable()
			.defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
	})
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('casetas')
}

