
import {Router} from "express"
import { auth } from "../../middlewear/auth.js";
import { HME, multerValidation, myMulter } from "../../services/mylter.js";
import { createPost, getcomments, getPost, likePost, unlikePost } from "./controller/conrtoller.js";

const router=Router()
router.post('/createPost',auth(['User']),myMulter(multerValidation.image).array('image',5),HME,createPost)
router.get('/getpost',getPost)
router.get("/getcomment", getcomments);//get comment and name of user create this comment
router.patch('/postLike/:postId',auth(['User']),likePost)
router.patch("/postunLike/:postId", auth(['User']), unlikePost);

export default router;