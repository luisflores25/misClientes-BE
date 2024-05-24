import { loadEnvFile } from './src/common/env/dotenv'
import {
	isDevelopmentEnv,
	isProductionEnv,
	isStagingEnv,
	isTestingEnv,
} from './src/common/env/environment'

// Update with your config settings.

async function getConfig() {
	// Load env vars depending on the environment
	if (isDevelopmentEnv() || isTestingEnv()) {
		// If we're in development/testing, load environment file
		loadEnvFile()
	} else if (isProductionEnv()) {
		// If we're in production, load env vars from AWS
	} else if (isStagingEnv()) {
		// If we're in staging, load env vars from AWS
	} else {
		throw new Error(`Couldn't find config`)
	}

	return {
		host: process.env.MYSQL_HOST,
		port: process.env.MYSQL_PORT,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASS,
		database: process.env.MYSQL_DB,
	}
}

const baseSettings = {
	client: 'mysql2',
	connection: async function () {
		return await getConfig()
	},
	migrations: {
		tableName: 'knex_migrations',
		directory: './src/migrations',
	},
}

module.exports = {
	development: {
		...baseSettings,
		seeds: {
			directory: './src/seeds/dev',
		},
	},

	production: {
		...baseSettings,
		seeds: {
			directory: './src/seeds/prod',
		},
	},

	staging: {
		...baseSettings,
		seeds: {
			directory: './src/seeds/staging',
		},
	},
}
