import { isDevelopmentEnv, isProductionEnv, isTestingEnv } from './environment'

/**
 * Will load an .env, depending on the current environment
 */
export const loadEnvFile = () => {
	const dotenv = require('dotenv')

	let envPath = '.env'

	if (isDevelopmentEnv()) {
		envPath = '.env'
	} else if (isTestingEnv()) {
		envPath = '.env.testing'
	} else if (isProductionEnv()) {
		envPath = '../.env'
	}

	dotenv.config({
		path: envPath,
	})
}
