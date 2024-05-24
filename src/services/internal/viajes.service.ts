import ViajesDao from '../../db/daos/viajes.dao'
import {
	ServiceInvalid,
	ServiceNotFound,
	ServiceServerError,
} from '../../common/service-errors'
import { ViajesDto } from '../../controllers/viajes/dtos/viajes.dto'
import { Viaje } from '../../db/types/viaje.type'
import SignedInUser = Express.SignedInUser
import { GetForTableDto } from '../../controllers/viajes/dtos/get-for-table.dto'
import { ColumnDef } from '../../db/types/column-def.type'

class ViajesService {
	viajesDao = new ViajesDao()

	/**
	 * Will return profile of the currently signed in user
	 * @param user
	 */
	async findViaje(v: number) {
		const viaje = this.viajesDao.findById(v)

		if (!viaje) {
			throw new ServiceNotFound(`Viaje no encontrado`)
		}

		return viaje!
	}

	async findColumns() {
		return this.viajesDao.findColumns()
	}

	async findForTable(
		user: SignedInUser,
		dto: GetForTableDto,
		type: 'dataset' | 'count'
	) {
		// Retrieve columns that the user has access to
		const columns = await this.findColumns()

		// For search, we will be building a new search array, which is the array
		// we will be passing to the DAO
		let qMapped: {
			name: string
			value: string
			type: ColumnDef.Type
		}[] = []

		// Same goes for range (search by timestamp range)
		let rangeMapped: {
			name: string
			start: string | null
			end: string | null
			type: ColumnDef.Type
		}[] = []

		// If user is attempting to search, we need to make sure that the user
		// has access to that column, that it's a searchable column (i.e. it's
		// one of the column types we've decided that can be searched on), and
		// that the value corresponds to the type (for some types, such as
		// boolean)
		if (dto.q && Array.isArray(dto.q)) {
			// User must have access to all columns
			for (const q of dto.q) {
				if (!columns.some((c: { id: string }) => c.id == q.name)) {
					throw new ServiceNotFound(
						`Unknown column "${q.name}", or you don't have access to it`
					)
				}
			}

			for (const q of dto.q) {
				const column = columns.find((c: { id: string }) => c.id == q.name)

				// If column is not found here, it means our previous role-related
				// validation failed for some reason
				if (!column) {
					throw new ServiceServerError(`Column not found`)
				}

				// Add column to the array we're preparing for the DTO
				qMapped.push({
					name: q.name,
					value: q.value,
					type: column.type,
				})

				// // Column must be of searchable type
				// if (!this.searchableColumnTypes.includes(column.type)) {
				// 	throw new ServiceInvalid(`Column "${column.id}" is not searchable`)
				// }

				// If column is of type ENUM, we must have a valid enum value
				// if column is of type BOOLEAN, we must have a valid true/false value
				if (column.type == ColumnDef.Type.ENUM) {
					const columnValues = (
						column.values! as { name: string; value: string }[]
					).map((o) => o.value)

					if (
						!Array.isArray(column.values) ||
						!columnValues.includes(q.value)
					) {
						throw new ServiceInvalid(
							`Unknown value "${q.value}" for column ID "${column.id}"`
						)
					}
				} else if (column.type == ColumnDef.Type.BOOLEAN) {
					if (q.value !== 'true' && q.value !== 'false') {
						throw new ServiceInvalid(
							`Column "${column.id}" is boolean, so it must receive either true or false`
						)
					}
				}
			}
		}

		// If user passed columns to search by BLANK (i.e. null), we will perform
		// similar validations: User must have access to that column and column
		// must be searchable (i.e. it's one of the column types we've decided
		// that can be searched on) or "range filterable"
		if (dto.blank && Array.isArray(dto.blank)) {
			// Validate all columns...
			for (const blankColumn of dto.blank) {
				const column = columns.find((c: { id: string }) => c.id == blankColumn)

				// User must have access to the column
				if (!column) {
					throw new ServiceInvalid(
						`Can't apply blank filter on column "${blankColumn}". Column is unknown, or you don't have access to it`
					)
				}

				// // Column must be of searchable or "range searchable" type
				// if (
				// 	!this.searchableColumnTypes.includes(column.type) &&
				// 	column.type != EnrollmentsColumnDef.Type.TIMESTAMP
				// ) {
				// 	throw new ServiceInvalid(
				// 		`Column "${column.id}" is not searchable, so blank filter cannot be applied`
				// 	)
				// }
			}
		}

		// If user passed columns to search by NOT BLANK (i.e. not null), we will perform
		// similar validations: User must have access to that column and column
		// must be searchable (i.e. it's one of the column types we've decided
		// that can be searched on) or "range filterable"
		if (dto.not_blank && Array.isArray(dto.not_blank)) {
			// Validate all columns...
			for (const notBlankColumn of dto.not_blank) {
				const column = columns.find((c: { id: string }) => c.id == notBlankColumn)

				// User must have access to the column
				if (!column) {
					throw new ServiceNotFound(
						`Can't apply not blank filter on column "${notBlankColumn}". Column is unknown, or you don't have access to it`
					)
				}

				// // Column must be of searchable or "range searchable" type
				// if (
				// 	!this.searchableColumnTypes.includes(column.type) &&
				// 	column.type != EnrollmentsColumnDef.Type.TIMESTAMP
				// ) {
				// 	throw new ServiceInvalid(
				// 		`Column "${column.id}" is not searchable, so not blank filter cannot be applied`
				// 	)
				// }
			}
		}

		// If user is attempting to filter by RANGE (this is, in timestamp
		// columns), we will perform the same validations: user must have access
		// to that column, and it must be a "range filterable" column
		if (dto.range && Array.isArray(dto.range)) {
			// User must have access to all columns
			for (const range of dto.range) {
				if (!columns.some((c: { id: string }) => c.id == range.name)) {
					throw new ServiceNotFound(
						`Unknown column "${range.name}", or you don't have access to it`
					)
				}
			}

			for (const range of dto.range) {
				const column = columns.find((c: { id: string }) => c.id == range.name)

				// If column is not found here, it means our previous role-related
				// validation failed for some reason
				if (!column) {
					throw new ServiceServerError(`Column not found`)
				}

				// Add column to the array we're preparing for the DTO
				rangeMapped.push({
					name: range.name,
					start: range.start ?? null,
					end: range.end ?? null,
					type: column.type,
				})

				// Column must be of "range searchable" type
				if (column.type != ColumnDef.Type.TIMESTAMP) {
					throw new ServiceInvalid(
						`Column "${column.id}" is not of type timestamp, cannot be searched on as range`
					)
				}
			}
		}

		// We will perform the same validation in sorting column
		// User must have access to it
		const sortCol = columns.find((c: { id: string }) => c.id == dto.sort_by)
		if (!sortCol) {
			throw new ServiceNotFound(
				`Can't sort by column "${dto.sort_by}". Column is unknown, or you don't have access to it`
			)
		}

		// // And column must be of the sortable types
		// if (!this.sortableColumnTypes.includes(sortCol.type)) {
		// 	throw new ServiceInvalid(`Column "${dto.sort_by}" is not sortable`)
		// }

		// // If we got filter, user role must have access to it (this way
		// // we are also validating that the filter exists, due
		// // to db constraints
		// if (dto.filter) {
		// 	const filterRelation = await this.enrollmentsFiltersPerRoleDao.find(
		// 		user.role!.id,
		// 		dto.filter
		// 	)
		// 	if (!filterRelation) {
		// 		throw new ServiceNotFound(
		// 			`Filter "${dto.filter}" doesn't exist, or you don't have access to it`
		// 		)
		// 	}
		// }

		// Retrieve enrollments with those columns
		const enrollments = await this.viajesDao.findAllForTable(
			user.id,
			columns,
			dto.p,
			dto.pp,
			dto.sort_by,
			dto.sort_dir,
			qMapped,
			rangeMapped,
			dto.blank ?? [],
			dto.not_blank ?? [],
			dto.is_exact ?? [],
			type,
			dto.filter
		)

		return enrollments
	}

    async createViaje(dto: ViajesDto, user: SignedInUser) {
		let viaje = {...dto} as Viaje 


		return this.viajesDao.create(viaje, user)
	}
}

export default new ViajesService()
