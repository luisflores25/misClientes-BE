import axios from 'axios'
import { loadEnvFile } from './dotenv'
import {
	isDevelopmentEnv,
	isProductionEnv,
	isStagingEnv,
	isTestingEnv,
} from './environment'

export const bootstrap = async () => {
	// To avoid starting server when we can't figure out the environment
	if (
		!isDevelopmentEnv() &&
		!isTestingEnv() &&
		!isProductionEnv() &&
		!isStagingEnv()
	) {
		const { logger } = require('../logs/logger')
		logger.error(`Couldn't start server, environment is unknown`)
		return
	}

	// Load env vars depending on the environment
	if (isDevelopmentEnv() || isTestingEnv()) {
		// If we're in development/testing, load environment file
		loadEnvFile()
	} else if (isProductionEnv()) {
		
	} else if (isStagingEnv()) {
		
	} else {
		// Once again, couldn't figure out environment :(
		const { logger } = require('../logs/logger')
		logger.error(`Couldn't start server, environment is unknown`)
	}

	// In prod/staging, attempt to get ec2 instance id
	let instanceId = 'unknown'
	if (isDevelopmentEnv()) {
		instanceId = 'local-dev'
	} else if (isProductionEnv() || isStagingEnv()) {
		const res = await axios.get(
			'http://169.254.169.254/latest/meta-data/instance-id'
		)
		instanceId = res.data
	}
	process.env.INSTANCE_ID = instanceId
}
