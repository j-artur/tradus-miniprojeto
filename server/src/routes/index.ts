import { Router } from 'express'
import authRouter from './auth'
import userRouter from './user'

const router = Router()

router.use('/api', authRouter)

router.use('/api/users', userRouter)

export default router
