import { Router } from 'express'
import { UserController } from '../controllers/user'
import { extractJWT } from '../middlewares/extractJWT'

const router = Router()

router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.post('/confirm/:token', UserController.confirmEmail)

router.post('/change-password/:token', UserController.changePassword)

router.post('/forget-password', UserController.forgetPassword)

router.get('/validate', extractJWT, UserController.validateToken)

export default router
