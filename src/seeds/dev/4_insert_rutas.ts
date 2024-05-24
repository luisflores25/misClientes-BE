import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Borra todos los registros existentes
    await knex('rutas').del();

    // Inserta registros de ejemplo
    await knex('rutas').insert([
        {
            nombre_ruta: 'Ruta A',
            creado_por: 1,
            actualizado_por: 1,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            nombre_ruta: 'Ruta B',
            creado_por: 2,
            actualizado_por: 2,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            nombre_ruta: 'Ruta C',
            creado_por: 3,
            actualizado_por: 3,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            nombre_ruta: 'Ruta D',
            creado_por: 1,
            actualizado_por: 1,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            nombre_ruta: 'Ruta E',
            creado_por: 2,
            actualizado_por: 2,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        }
    ]);
};
