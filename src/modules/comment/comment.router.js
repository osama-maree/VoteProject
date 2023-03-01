import {Router }from 'express'
import { auth } from '../../middlewear/auth.js'
import { createComment } from './controller/controller.js'
const router=Router()
router.post('/createComment/:id',auth(['User']),createComment)

export default router