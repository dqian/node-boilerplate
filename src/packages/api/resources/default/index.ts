import Router from 'express-promise-router'
import { health } from '~/packages/api/resources/default/controller'

const router = Router()

router.route('/health').get(health)

export default router
