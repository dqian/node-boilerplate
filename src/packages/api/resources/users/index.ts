import Router from 'express-promise-router'
import { info } from '~/packages/api/resources/users/controller'

const router = Router()

router.route('/info').get(info)

export default router
