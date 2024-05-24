import { loadEnvFile } from '../../common/env/dotenv'
import { Knex } from 'knex'
import {
	isDevelopmentEnv,
	isProductionEnv,
	isStagingEnv,
	isTestingEnv,
} from '../../common/env/environment'
import typecast from './typecast'
import pool from './pool'
// import { logger } from '../../common/logs/logger'

loadEnvFile()

/**
 *
 * If env var ENABLE_MULTIPLE_DB_INSTANCES=1, this will export
 * a Knex instance, connecting to the read DB cluster
 *
 * If ENABLE_MULTIPLE_DB_INSTANCES=0 or it doesn't exist,
 * this will export a Knex instance, connecting to the
 * main DB
 *
 */

let dbName = process.env.MYSQL_DB

/**
 * For testing, we'll return a DB specific for the Jest worker currently running
 */
if (isTestingEnv()) {
	dbName = `sos_test_${process.env.JEST_WORKER_ID}`
}

let seedsDirectory = './src/seeds/dev'
if (isProductionEnv()) {
	seedsDirectory = './src/seeds/prod'
} else if (isStagingEnv()) {
	seedsDirectory = './src/seeds/staging'
} else if (isTestingEnv()) {
	seedsDirectory = './src/seeds/dev'
}

let settings: Knex.Config = {
	client: 'mysql2',
	connection: {
		host: process.env.MYSQL_HOST,
		port: parseInt(process.env.MYSQL_PORT ?? '3000'),
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASS,
		database: dbName,
		typeCast: typecast,
	},
	debug: isDevelopmentEnv(),

	// To force UTC in this connection
	pool: pool,

	seeds: {
		directory: seedsDirectory,
	},
}

if (process.env.ENABLE_MULTIPLE_DB_INSTANCES == '1') {

	settings.connection = {
		host: process.env.MYSQL_READ_HOST,
		port: parseInt(process.env.MYSQL_READ_PORT ?? '3000'),
		user: process.env.MYSQL_READ_USER,
		password: process.env.MYSQL_READ_PASS,
		database: process.env.MYSQL_READ_DB,
		typeCast: typecast,
	}
}


export const readKnex: Knex = require('knex')(settings)
