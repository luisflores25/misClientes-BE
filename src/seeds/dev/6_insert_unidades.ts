import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Borra todos los registros existentes
    await knex('unidades').del();

    // Inserta registros de ejemplo
    await knex('unidades').insert([
        {
            id_combustible: 1,
            nombre_unidad: 'Camión de carga ligera',
            creado_por: 1,
            actualizado_por: 1,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            id_combustible: 1,
            nombre_unidad: 'Camión de carga pesada',
            creado_por: 2,
            actualizado_por: 2,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            id_combustible: 5,
            nombre_unidad: 'Tráiler',
            creado_por: 3,
            actualizado_por: 3,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            id_combustible: 2,
            nombre_unidad: 'Camioneta de reparto',
            creado_por: 1,
            actualizado_por: 1,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            id_combustible: 3,
            nombre_unidad: 'Furgoneta',
            creado_por: 2,
            actualizado_por: 2,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            id_combustible: 1,
            nombre_unidad: 'Camión cisterna',
            creado_por: 3,
            actualizado_por: 3,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        }
    ]);
};
