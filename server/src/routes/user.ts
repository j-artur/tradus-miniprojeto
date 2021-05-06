import { Router } from 'express'
import { UserController } from '../controllers/user'
import { extractJWT } from '../middlewares/extractJWT'
import { invokeAdmin } from '../middlewares/invokeAdmin'

const router = Router()

router.use(extractJWT, invokeAdmin)

router.post('/', UserController.create)

router.get('/', UserController.getAll)

router.get('/:id', UserController.getOne)

router.patch('/:id', UserController.update)

router.delete('/:id', UserController.delete)

export default router
