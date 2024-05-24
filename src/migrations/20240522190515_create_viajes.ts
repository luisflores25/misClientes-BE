import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('viajes', table => {
		table
			.increments('id')
			.unsigned()
			.primary()
			.notNullable()
        table
			.integer('id_ruta_ida')
			.unsigned()
			.notNullable()
        table
			.integer('id_ruta_regreso')
			.unsigned()
			.notNullable()  
        table
			.integer('id_unidad')
			.unsigned()
			.notNullable()
		table
			.string('tipo_viaje', 50)
			.notNullable()
		table
			.timestamp('fecha_ida')
			.nullable()
        table
			.timestamp('fecha_regreso')
			.nullable()
		table
			.integer('num_pasajeros')
			.unsigned()
			.notNullable()
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
}

