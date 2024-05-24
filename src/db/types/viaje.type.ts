import { DateTime } from "luxon"

export type Viaje = {
    id_unidad: number
    id_ruta_ida: number
    id_ruta_regreso: number
	tipo_viaje: string
    fecha_ida: string
    fecha_regreso: string
	num_pasajeros: number
	creado_por?: number | null
	actualizado_por?: number | null
	fecha_creado?: string // timestamp
	fecha_actualizado?: string // timestamp
}