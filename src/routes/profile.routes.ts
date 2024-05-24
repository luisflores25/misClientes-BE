import express from 'express'
import ProfileController from '../controllers/profile/profile.controller'

/**
 * All of these routes refer to details of the currently signed in user
 */

const router = express.Router()

// To get profile data
router.get('/', ProfileController.get)


export default router
