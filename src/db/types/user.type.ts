export type User = {
	id: number
	usuario: string
	nombre: string
	email: string | null
	contrasena: string | null
	fecha_nacimiento: string | null // date
	genero: User.Gender | null
	activo: boolean
	creado_por: number | null
	actualizado_por: number | null
	fecha_creado: number // timestamp
	fecha_actualizado: number // timestamp
}

export namespace User {
	export enum Gender {
		MALE = 'hombre',
		FEMALE = 'mujer',
		OTHER = 'no especificado',
	}
}
