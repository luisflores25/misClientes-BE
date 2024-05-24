import UsersDao from '../../db/daos/users.dao'
import { ServiceInvalid } from '../../common/service-errors'
import { LoginJwt } from '../../common/types/login-jwt.type'
import { User } from '../../db/types/user.type'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthService {
	usersDao = new UsersDao()

	async auth(username_email: string, password: string) {
		const user = await this.usersDao.findByUsernameEmail(username_email, true)
		if (!user) {
			throw new ServiceInvalid(`User not found`)
		}
		const compare = await bcrypt.compare(password, user.contrasena)
		if (!compare) {
			throw new ServiceInvalid(`Invalid password`)
		}

		// At this point everything is valid, generate JWT
		const payload = <LoginJwt>{
			user_id: user.id,
			user_full_name: user.nombre,
			user_email_address: user.email,
		}

		return {
			...payload,
			jwt: jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: process.env.JWT_EXPIRES_IN,
			}),
		}
	}
}

export default new AuthService()
