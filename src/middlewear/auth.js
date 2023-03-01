import jwt from "jsonwebtoken";
import {userModel} from '../../DB/model/user.model.js'
export const auth = (access=[]) => {
  return async (req, res, next) => {
    try{
    let { token } = req.headers;
    if (!token.startsWith(process.env.authBearerToken)) {
      res.json({ message: "error token" });
    } else {
      token = token.split("__")[1];
      const decoded = await jwt.verify(token, process.env.LOGINTOKEN);
      const user = await userModel.findById(decoded.id);
      if(!user){
        res.status(401).json({error:'user not register'})
      }
      if(!access.includes(user.role)){
        res.status(403).json({error:"user is not authorized"})
      }
      req.user = user;
      next();
    }
  }catch(err){
    res.status(404).json({Message:"internal error in token"})
  }
}
};
