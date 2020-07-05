import * as express from 'express'
import defaultRouter from '~/packages/api/resources/default/index'
import userRouter from '~/packages/api/resources/users/index'

const router = express.Router()

router.use('/users', userRouter)
router.use('/', defaultRouter)

export default router
