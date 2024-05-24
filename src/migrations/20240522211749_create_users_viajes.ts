import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users_viajes', table => {
		table
			.increments('id')
			.unsigned()
			.primary()
			.notNullable()

		table
			.integer('viaje_id')
			.unsigned()
			.notNullable()
			.references('viajes.id')
		table
			.integer('user_id')
            .unsigned()
			.notNullable()
			.references('users.id')
		table
			.decimal('presupuesto')
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
    return knex.schema.dropTable('users_viajes')
}

