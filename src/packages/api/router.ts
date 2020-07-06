import * as express from 'express'
import defaultRouter from '~/packages/api/resources/default/index'
import userRouter from '~/packages/api/resources/users/index'
import sessionRouter from '~/packages/api/resources/sessions/index'

const router = express.Router()

router.use('/user', userRouter)
router.use('/s', sessionRouter)
router.use('/', defaultRouter)

export default router
