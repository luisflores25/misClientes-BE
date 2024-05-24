import express from 'express'
import ViajesController from '../controllers/viajes/viajes.controller'
import { ViajesDto } from '../controllers/viajes/dtos/viajes.dto'
import { dtoValidation } from '../middlewares/dto-validation'
import { GetForTableDto } from '../controllers/viajes/dtos/get-for-table.dto'

/**
 * All of these routes refer to details of the currently signed in user
 */

const router = express.Router()

// To return enrollments for table (dataset + total rows count)
router.get(
	'/',
	dtoValidation(GetForTableDto, false, 'query'),
	ViajesController.getForTable('dataset')
)

// To return column definitions for table
router.get(
	'/columns',
	ViajesController.getColumns()
)
// To create viajes
router.post('/', dtoValidation(ViajesDto), ViajesController.create)


export default router