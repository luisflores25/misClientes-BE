import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', table => {
		table
			.increments('id')
			.unsigned()
			.primary()
			.notNullable()
		table
			.string('usuario', 50)
			.unique()
			.notNullable()
		table
			.string('nombre', 100)
			.notNullable()
		table
			.string('email', 254)
			.unique()
			.nullable()
			.defaultTo(null)
		table
			.string('contrasena', 64)
			.nullable()
			.defaultTo(null)
		table
			.date('fecha_nacimiento')
			.nullable()
			.comment('Null if this user is for API use')
		table
			.enum('genero', ['hombre', 'mujer', 'no especificado'])
			.nullable()
		table
			.boolean('activo')
			.notNullable()
			.defaultTo(false)
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
	return knex.schema.dropTable('users')
}

