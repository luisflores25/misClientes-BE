import { BaseDao } from './base.dao'
import { Knex } from 'knex'
import { User } from '../types/user.type'
import { SortDir } from '../../common/types/sort-dir.type'

export default class UsersDao extends BaseDao {
	mainTransacting(transaction: Knex.Transaction): UsersDao {
		return new UsersDao(transaction, 'main')
	}

	readTransacting(transaction: Knex.Transaction): UsersDao {
		return new UsersDao(transaction, 'read')
	}


	async findById(id: number, mustBeEnabled?: boolean) {
		const q = this.mainKnex<User>('users').where('id', id).first()

		if (mustBeEnabled) {
			q.where('activo', true)
		}

		return q
	}

	async findByEmailAddress(emailAddress: string, mustBeEnabled?: boolean) {
		const q = this.readKnex<User>('users')
			.where('email', emailAddress)
			.first()

		if (mustBeEnabled) {
			q.where('activo', true)
		}

		return q
	}

	async findByUsernameEmail(username_email: string, mustBeEnabled?: boolean) {
		const q = this.readKnex<User>('users')
			.where('email', username_email)
			.orWhere('usuario', username_email)
			.first()

		if (mustBeEnabled) {
			q.where('activo', true)
		}

		return q
	}

	async findByUsername(username: string, mustBeEnabled?: boolean) {
		const q = this.readKnex<User>('users').where('usuario', username).first()

		if (mustBeEnabled) {
			q.where('activo', true)
		}

		return q
	}

	async findByFullname(fullName: string, mustBeEnabled?: boolean) {
		const q = this.readKnex<User>('users').where('nombre', fullName).first()

		if (mustBeEnabled) {
			q.where('activo', true)
		}

		return q
	}

	async create(user: User) {
		const [id] = await this.mainKnex<User>('users').insert(user)

		return this.findById(id)
	}

	async updateUser(userId: number, data: Partial<User>, actualizado_por: number) {
		await this.mainKnex<User>('users')
			.where('id', userId)
			.update({
				...data,
				actualizado_por,
			})

		return this.findById(userId)
	}

	async updateUsername(userId: number, newUsername: string) {
		await this.mainKnex<User>('users').where('id', userId).update({
			usuario: newUsername,
		})

		return this.findById(userId)
	}
}
