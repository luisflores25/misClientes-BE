import express from 'express'
import RutasController from '../controllers/rutas/rutas.controller'

/**
 * All of these routes refer to details of the currently signed in user
 */

const router = express.Router()

// To get rutas data dropdown
router.get('/', RutasController.get)


export default router