import { commentModel } from "../../../../DB/model/comment.model.js"
import { postModel } from "../../../../DB/model/post.model.js"



export const createComment=async(req,res)=>{
    try{
     
        const {text}=req.body
        const {id}=req.params
        const post=await postModel.findById(id)
        if(!post){
            res.status(400).json({error:'not found this post'})
        }else {
      const comment= await commentModel.create({text,userId:req.user._id})
      await postModel.findByIdAndUpdate(id,{
        $push:{commentsId:comment._id}
      })
      res.status(201).json({message:"success"})
        }
    }catch(err){
        res.status(400).json({error:"internal error"})
    }
}