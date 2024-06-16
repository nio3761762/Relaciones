import {Router} from 'express'
import {createUser, deleteUser, getUser, getUsers, updateUser,login} from '../controllers/user.controllers'

const router = Router();
router.post('/addusers', createUser)

router.get('/users', getUsers)

router.put('/users/:id', updateUser)

router.delete('/users/:id', deleteUser)

router.get('/users/:id', getUser)

router.post("/login", login)

 export default router;