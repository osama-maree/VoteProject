import { Router } from "express";
import { auth } from "../../middlewear/auth.js";
import { HME, multerValidation, myMulter } from "../../services/mylter.js";
import { getProfile, profileCover, ProfilePic } from "./controller/controller.js";
const router = Router();

router.get("/",auth(['User']),getProfile)
router.patch('/profilePic',auth(['User']),myMulter(multerValidation.image).single('image'),HME,ProfilePic)
router.patch('/profileCover',auth(['User']),myMulter(multerValidation.image).array('image',5),profileCover)
export default router