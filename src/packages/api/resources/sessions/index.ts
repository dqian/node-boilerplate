import Router from 'express-promise-router'
import { login, register } from '~/packages/api/resources/sessions/controller'

const router = Router()

router.route('/login').post(login)
router.route('/register').post(register)

export default router
