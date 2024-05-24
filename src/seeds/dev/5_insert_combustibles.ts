import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Borra todos los registros existentes
    await knex('combustibles').del();

    // Inserta registros de ejemplo
    await knex('combustibles').insert([
        {
            nombre_combustible: 'Diesel',
            precio: 20.50,
            creado_por: 1,
            actualizado_por: 1,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            nombre_combustible: 'Gasolina Regular',
            precio: 18.75,
            creado_por: 2,
            actualizado_por: 2,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            nombre_combustible: 'Gasolina Premium',
            precio: 22.30,
            creado_por: 3,
            actualizado_por: 3,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            nombre_combustible: 'Gas LP',
            precio: 15.00,
            creado_por: 1,
            actualizado_por: 1,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            nombre_combustible: 'Biodiesel',
            precio: 19.50,
            creado_por: 2,
            actualizado_por: 2,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        }
    ]);
};
