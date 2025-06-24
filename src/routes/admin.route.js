import express from 'express'
import { getAll, importData } from '../controllers/admin.controller.js'

const router = express.Router()

router.get('/all', getAll)
router.post('/add', importData)

export default router