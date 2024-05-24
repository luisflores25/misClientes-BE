/**
 * To check if we're in development environment
 */
export const isDevelopmentEnv = () => {
	const env = process.env.NODE_ENV
	return env == 'development' || env == 'dev' || !env
}

/**
 * To check if we're in testing environment
 */
export const isTestingEnv = () => {
	const env = process.env.NODE_ENV
	return env == 'testing' || env == 'test'
}

/**
 * To check if we're in staging environment
 */
export const isStagingEnv = () => {
	const env = process.env.NODE_ENV
	return env == 'staging'
}

/**
 * To check if we're in production environment
 */
export const isProductionEnv = () => {
	const env = process.env.NODE_ENV
	return env == 'production' || env == 'prod'
}

/**
 * To check if this is an environment
 * for scripts (usually production)
 */
export const isScriptsEnv = () => {
	return process.env.IS_SCRIPTS == '1'
}

/**
 * To check if this is an environment
 * for retry (usually production)
 */
export const isRetryEnv = () => {
	return process.env.IS_RETRY == '1'
}
