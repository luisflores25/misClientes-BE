import { Knex } from "knex";
const bcrypt = require('bcrypt')

export async function seed(knex: Knex): Promise<void> {
    // Borra todos los registros existentes
    await knex('users').del();

    // Inserta registros de ejemplo
    await knex('users').insert([
        {
            usuario: 'juanperez',
            nombre: 'Juan Pérez',
            email: 'juan.perez@ejemplo.com',
            contrasena: bcrypt.hashSync('test', 8), 
            fecha_nacimiento: '1990-01-01',
            genero: 'hombre',
            activo: true,
            creado_por: 1,
            actualizado_por: 1,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            usuario: 'mariagarcia',
            nombre: 'María García',
            email: 'maria.garcia@ejemplo.com',
            contrasena: bcrypt.hashSync('test', 8), 
            fecha_nacimiento: '1992-02-02',
            genero: 'mujer',
            activo: true,
            creado_por: 1,
            actualizado_por: 1,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            usuario: 'desarrolladorapi',
            nombre: 'Desarrollador API',
            email: null,
            contrasena: bcrypt.hashSync('test', 8),
            fecha_nacimiento: null,
            genero: 'no especificado',
            activo: true,
            creado_por: 1,
            actualizado_por: 1,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        }
    ]);
};
