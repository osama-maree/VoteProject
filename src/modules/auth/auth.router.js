import {Router} from 'express'
import { confirmEmail, signin, signup } from './controller/controller.js'
const router=Router()

router.post('/signup',signup)
router.get("/confirmEmail/:token", confirmEmail);
router.get('/login',signin)
export default router