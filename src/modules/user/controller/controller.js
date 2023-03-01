import { userModel } from "../../../../DB/model/user.model.js"
import cloudinary  from "../../../services/cloudinary.js"


export const getProfile=async(req,res)=>{
   try{
     const user =await userModel.findById(req.user._id)
     res.status(200).json({message:"success",user})
   }catch(err){
    res.status(404).json({message:"internal error"})
   }
}

export const ProfilePic=async(req,res)=>{
  try{
    if(!req.file){
      res.status(400).json({message:"pleaze upload an image"})
    }else {
    const {secure_url}=  await cloudinary.uploader.upload(req.file.path,{
        folder:'vot'
      })
     await userModel.findByIdAndUpdate(req.user.id,{
        profilePic:secure_url
      })
     // console.log("sad");
      res.status(201).json({message:"success"})
    }
  }catch(err){
    res.status(400).json({error:'internal error'})
  }
}
export const profileCover=async(req,res)=>{
try{
  let aa=[]
  for(let i of req.files){
   const { secure_url } = await cloudinary.uploader.upload(i.path, {
     folder: "vot",
   });
   aa.push(secure_url)
  }
 
    await userModel.findByIdAndUpdate(req.user.id, {
      coverPic: aa,
    });
    res.status(201).json({ message: "success" });
}catch(err){
  res.status(400).json({error:"internal error"})
}

}