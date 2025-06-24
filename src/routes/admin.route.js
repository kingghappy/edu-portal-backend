import express from 'express'
import { getAll, importData, findUser,updateUser,deleteUser } from '../controllers/admin.controller.js'

const router = express.Router()

router.get('/all', getAll)
router.get('/find', findUser)
router.post('/add', importData)
router.post('/update', updateUser)
router.post('/delete', deleteUser)


export default router