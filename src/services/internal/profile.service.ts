import UsersDao from '../../db/daos/users.dao'
import SignedInUser = Express.SignedInUser
import {
	ServiceNotFound,
} from '../../common/service-errors'

class ProfileService {
	usersDao = new UsersDao()

	/**
	 * Will return profile of the currently signed in user
	 * @param user
	 */
	async findProfile(user: SignedInUser) {
		const profile = this.usersDao.findById(user.id)

		if (!profile) {
			throw new ServiceNotFound(`Profile not found`)
		}

		return profile!
	}
}

export default new ProfileService()
