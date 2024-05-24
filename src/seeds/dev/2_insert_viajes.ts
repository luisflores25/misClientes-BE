import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Borra todos los registros existentes
    await knex('viajes').del();

    // Inserta registros de ejemplo
    await knex('viajes').insert([
        {
            id_ruta_ida: 1,
            id_ruta_regreso: 2,
            id_unidad: 1,
            tipo_viaje: 'redondo',
            fecha_ida: '2024-05-01 08:00:00',
            fecha_regreso: '2024-05-10 18:00:00',
            num_pasajeros: 1,
            creado_por: 1,
            actualizado_por: 1,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            id_ruta_ida: 3,
            id_ruta_regreso: 4,
            id_unidad: 2,
            tipo_viaje: 'Madero #1332, Segunda Seccion',
            fecha_ida: '2024-06-15 10:00:00',
            fecha_regreso: '2024-06-20 20:00:00',
            num_pasajeros: 2,
            creado_por: 2,
            actualizado_por: 2,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            id_ruta_ida: 5,
            id_ruta_regreso: 6,
            id_unidad: 3,
            tipo_viaje: 'redondo',
            fecha_ida: '2024-07-05 07:00:00',
            fecha_regreso: '2024-07-12 19:00:00',
            num_pasajeros: 3,
            creado_por: 3,
            actualizado_por: 3,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        }
    ]);
};
