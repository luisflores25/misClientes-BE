import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    
    // Borra todos los registros existentes
    await knex('users_viajes').del();

    // Inserta registros de ejemplo
    await knex('users_viajes').insert([
        {
            viaje_id: 1,
            user_id: 1,
            presupuesto: 2500,
            creado_por: 1,
            actualizado_por: 1,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            viaje_id: 2,
            user_id: 2,
            presupuesto: 3500,
            creado_por: 2,
            actualizado_por: 2,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            viaje_id: 3,
            user_id: 3,
            presupuesto: 4500,
            creado_por: 3,
            actualizado_por: 3,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            viaje_id: 1,
            user_id: 2,
            creado_por: 1,
            actualizado_por: 1,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        },
        {
            viaje_id: 2,
            user_id: 3,
            creado_por: 2,
            actualizado_por: 2,
            fecha_creado: knex.fn.now(),
            fecha_actualizado: knex.fn.now()
        }
    ]);
};
