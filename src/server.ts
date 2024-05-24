import { bootstrap } from './common/env/bootstrap'
import { isProductionEnv } from './common/env/environment'

/**
 * This block was created to be able to gather information (with await)
 * during bootstrap, without starting the server yet. And, most importantly,
 * without importing "app".
 * This is because in prod/staging environments, we need to retrieve the
 * instance ID before importing the "logger.ts" file (which would happen
 * if we imported "app" at the beginning, due to the errorLogger/errorHandler
 * middlewares
 */
;(async () => {
	// Moved initializer to another code so that it can be used in Scripts.
	await bootstrap()

	// Set our env vars
	const port = parseInt(process.env.SERVER_PORT ?? '3000')
	const host = process.env.SERVER_HOST ?? '0.0.0.0'
	const env = process.env.NODE_ENV

	// We're ready to start... Import app
	const app = require('./app').default
	//const { logger } = require('./common/logs/logger')

	// Let's go! 🚀
	const server = app.listen(port, host, async () => {
		console.log(`Server running on ${host}:${port}, ${env} environment`)

		// If we're in production, trigger another log 2 seconds later, to force
		// our Pino transport to upload the log to Cloudwatch
		if (isProductionEnv()) {
			setTimeout(() => {
				console.log(`Forcing Cloudwatch log upload`)
			}, 2000)
		}
	})

	server.keepAliveTimeout = 121 * 1000
	server.headersTimeout = 122 * 1000
})()
