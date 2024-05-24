import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Borra todos los registros de las tablas dependientes primero
    await knex('rutas_casetas').del();
    await knex('casetas').del();
    await knex('rutas').del();

    // Inserta registros de ejemplo en la tabla `casetas`
    await knex('casetas').insert([
        { id: 1, nombre_caseta: 'Caseta Central', precio: 50.75, creado_por: 1, actualizado_por: 1, fecha_creado: knex.fn.now(), fecha_actualizado: knex.fn.now() },
        { id: 2, nombre_caseta: 'Caseta Norte', precio: 30.00, creado_por: 2, actualizado_por: 2, fecha_creado: knex.fn.now(), fecha_actualizado: knex.fn.now() },
        { id: 3, nombre_caseta: 'Caseta Sur', precio: 45.25, creado_por: 3, actualizado_por: 3, fecha_creado: knex.fn.now(), fecha_actualizado: knex.fn.now() },
        { id: 4, nombre_caseta: 'Caseta Este', precio: 60.50, creado_por: 1, actualizado_por: 1, fecha_creado: knex.fn.now(), fecha_actualizado: knex.fn.now() },
        { id: 5, nombre_caseta: 'Caseta Oeste', precio: 55.00, creado_por: 2, actualizado_por: 2, fecha_creado: knex.fn.now(), fecha_actualizado: knex.fn.now() }
    ]);

    // Inserta registros de ejemplo en la tabla `rutas`
    await knex('rutas').insert([
        { id: 1, nombre_ruta: 'Ruta A', creado_por: 1, actualizado_por: 1, fecha_creado: knex.fn.now(), fecha_actualizado: knex.fn.now() },
        { id: 2, nombre_ruta: 'Ruta B', creado_por: 2, actualizado_por: 2, fecha_creado: knex.fn.now(), fecha_actualizado: knex.fn.now() },
        { id: 3, nombre_ruta: 'Ruta C', creado_por: 3, actualizado_por: 3, fecha_creado: knex.fn.now(), fecha_actualizado: knex.fn.now() },
        { id: 4, nombre_ruta: 'Ruta D', creado_por: 1, actualizado_por: 1, fecha_creado: knex.fn.now(), fecha_actualizado: knex.fn.now() },
        { id: 5, nombre_ruta: 'Ruta E', creado_por: 2, actualizado_por: 2, fecha_creado: knex.fn.now(), fecha_actualizado: knex.fn.now() }
    ]);

    // Inserta registros de ejemplo en la tabla `rutas_casetas`
    await knex('rutas_casetas').insert([
        { ruta_id: 1, caseta_id: 1, distancia: 100.5, creado_por: 1, actualizado_por: 1, fecha_creado: knex.fn.now(), fecha_actualizado: knex.fn.now() },
        { ruta_id: 1, caseta_id: 2, distancia: 150.0, creado_por: 1, actualizado_por: 1, fecha_creado: knex.fn.now(), fecha_actualizado: knex.fn.now() },
        { ruta_id: 2, caseta_id: 3, distancia: 200.0, creado_por: 2, actualizado_por: 2, fecha_creado: knex.fn.now(), fecha_actualizado: knex.fn.now() },
        { ruta_id: 3, caseta_id: 4, distancia: 250.5, creado_por: 3, actualizado_por: 3, fecha_creado: knex.fn.now(), fecha_actualizado: knex.fn.now() },
        { ruta_id: 4, caseta_id: 5, distancia: 300.75, creado_por: 1, actualizado_por: 1, fecha_creado: knex.fn.now(), fecha_actualizado: knex.fn.now() }
    ]);
};
