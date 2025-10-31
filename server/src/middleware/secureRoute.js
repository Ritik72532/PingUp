import jwt from "jsonwebtoken"
import User from "../models/user.models.js"
 const secureRoute =async (req,res,next)=>{
try {
   console.log(" Incoming cookies:", req.cookies); 
    const token = req.cookies.jwt;
    if(!token){
      return  res.status(400).json({message:"No token , authorization denied"});
    }
    const decoded = jwt.verify(token,process.env.JWT_TOKEN);
    if(!decoded){
         return  res.status(400).json({message:"Invalid token"});
    }
    const user = await User.findById(decoded.userId).select("-password");
    if(!user){
         return  res.status(400).json({message:"No user found"});
    }
    req.user = user
    next();
} catch (error) {
    console.log("Error in secure route " + error);
    res.status(500).json({message:"Something went wrong"})
}
}
export default secureRoute