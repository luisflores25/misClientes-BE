import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import responder from '../src/middlewares/responder'
import routes from '../src/routes'
import errorHandler from '../src/middlewares/error-handler'
//import requestLogger from './middlewares/request-logger'

/**
 * Initialize express
 */
const app = express()

/**
 * Before middlewares
 */
app.use(responder)
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))

/**
 * CORS from all origins
 */
app.use(cors())

/**
 * To log all requests (except cors requests)

//app.use(requestLogger)

/**
 * Routes
 */
app.use(routes)

/**
 * After middlewares
 */
app.use(errorHandler)

export default app
