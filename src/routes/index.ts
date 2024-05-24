import express from 'express'
import AuthRoutes from './auth.routes'
import ProfileRoutes from './profile.routes'
import ViajesRoutes from './viajes.routes'
import UnidadesRoutes from './unidades.routes'
import RutasRoutes from './rutas.routes'
import { authLoggedUser } from '../middlewares/auth-logged'


const router = express.Router()


router.use('/auth', AuthRoutes)
router.use('/profile', authLoggedUser(), ProfileRoutes)
router.use('/viajes', authLoggedUser(), ViajesRoutes)
router.use('/unidades', authLoggedUser(), UnidadesRoutes)
router.use('/rutas', authLoggedUser(), RutasRoutes)

export default router

