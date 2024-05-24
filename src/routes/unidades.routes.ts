import express from 'express'
import UnidadesController from '../controllers/unidades/unidades.controller'

/**
 * All of these routes refer to details of the currently signed in user
 */

const router = express.Router()

// To get unidades data dropdown
router.get('/', UnidadesController.get)


export default router