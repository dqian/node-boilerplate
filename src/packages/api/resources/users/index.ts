import Router from 'express-promise-router'
import { info } from '~/packages/api/resources/users/controller'
import { requireAuth } from '../../auth'

const router = Router()

router.route('/info').all(requireAuth()).get(info)

export default router
