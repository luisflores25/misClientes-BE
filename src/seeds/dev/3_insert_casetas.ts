import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Borra todos los registros existentes
    await knex('casetas').del();

    // Inserta registros de ejemplo
    await knex('casetas').insert([
        {
            nombre_caseta: 'Caseta Central',
            precio: 50.75,
            creado_por: 1,
            actualizado_por: 1,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            nombre_caseta: 'Caseta Norte',
            precio: 30.00,
            creado_por: 2,
            actualizado_por: 2,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            nombre_caseta: 'Caseta Sur',
            precio: 45.25,
            creado_por: 3,
            actualizado_por: 3,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            nombre_caseta: 'Caseta Este',
            precio: 60.50,
            creado_por: 1,
            actualizado_por: 1,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            nombre_caseta: 'Caseta Oeste',
            precio: 55.00,
            creado_por: 2,
            actualizado_por: 2,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        }
    ]);
};
