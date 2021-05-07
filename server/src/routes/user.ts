import { Router } from 'express'
import { UserController } from '../controllers/user'
import { extractJWT } from '../middlewares/extractJWT'
import { invokeAdmin } from '../middlewares/invokeAdmin'
import { preventAlterAdmin } from '../middlewares/preventAdmin'

const router = Router()

router.use(extractJWT, invokeAdmin)

router.post('/', UserController.create)

router.get('/', UserController.getAll)

router.get('/:id', UserController.getOne)

router.patch('/:id', preventAlterAdmin, UserController.update)

router.delete('/:id', preventAlterAdmin, UserController.delete)

export default router
