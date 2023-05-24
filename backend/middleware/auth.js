const jwt = require("../services/JWTservice");
const User=require("../models/user");
const userDTO=require("../dto/userDTO");
const auth =async(req,res,next)=>{
    const {refreshToken,accessToken}=req.cookies;
    if (!refreshToken || !accessToken) {
        return next(new Error("Access denied"));
    }
    let id;
    try{
        id = await jwt.verifyAccessToken(accessToken);
       

    }
    catch(error){
        return next(error);
    }
   
    try{
        user=await User.findOne({_id:id});
        if (!user) {
            return next(new Error("User not found"));
        }

    }
    catch(error){
        return next(error);
    }

    userdto=userDTO(user);
    req.user=userdto;
    next();

}
module.exports=auth;
