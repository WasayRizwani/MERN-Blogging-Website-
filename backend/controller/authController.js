const joi=require ("joi");
const User=require("../models/user");
const bcrypt=require("bcryptjs");
const userDTO=require("../dto/userDTO");
const JWT=require("../services/JWTservice");    
const { LEGAL_TLS_SOCKET_OPTIONS } = require("mongodb");
const RefreshToken=require("../models/token");

const authController= {
    async login(req, res,next) {
        console.log("login");
        // 1   Validate the request
            const userScheme=joi.object({
            
                email:joi.string().min(3).max(30).required().email(),
                password:joi.string().min(3).max(30).required()
            });

            const {error}=userScheme.validate(req.body);

        //2 Error Handling
            if (error) {
                return next(error);
            }
            //3   Make sure user is  already in the database
            let user=null;
            password=req.body.password;
            email=req.body.email;
            hashedPassword=await bcrypt.hash(password,10);
            try {
                 user= await User.findOne({"email":email});
                if (!user) {
                    return next(new Error("User not found"));
                }
               passwordMatch= await bcrypt.compare(password,user.password);
                if (!passwordMatch) {
                    return next(new Error("Password not matched"));
                }


            }
            catch(error){
                return next(error);
            }

        let refreshToken;
        let accessToken;
            
        try{
             refreshToken=JWT.signRefreshToken({_id:user._id},"30d");
             accessToken=JWT.signAccessToken({_id:user._id},"15m");
            
        }
        catch(error){
            return next(error);
        }

            res.cookie("refreshToken",refreshToken,{httpOnly:true});
            res.cookie("accessToken",accessToken,{httpOnly:true});
        try{
         
            await RefreshToken.updateOne({userId:user._id},{refreshToken:refreshToken},{upsert:true});

        }
        catch(error){
            return next(error);
        }
        return res.status(200).json({user:userDTO(user),auth:true});
        
        




    },
    async register(req, res,next) {
        console.log("register");

        //1   Validate the request
            const userScheme=joi.object({
                name:joi.string().min(3).max(30).required(),
                userName:joi.string().min(3).max(30).required(),
                email:joi.string().min(3).max(30).required().email(),
                password:joi.string().min(3).max(30).required(),
                confirmPassword:joi.ref("password")
            });
            const {error}=userScheme.validate(req.body);
            
        //2 Error Handling
            if (error) {
                return next(error);
            }

        //3   Make sure user is not already in the database
            const {name,userName,email,password,confirmPassword}=req.body;
            try {
                const emailExists=await User.exists({email});
                const userNameExists=await User.exists({userName});
                if (emailExists) {
                    return next(new Error("Email already exists"));
                }
                if (userNameExists) {
                    return next(new Error("User name already exists"));
                }
                
            }
            catch(error){
                return next(error);
            }
        //4  Hash the password
            const hashedPassword=await bcrypt.hash(password,10);
        //5  Create a new user

            const user=await User.create({
               name,
                userName,
                email,
                password:hashedPassword
            });
            
        //6  Generate a token
        let refreshToken;
        let accessToken;
            
        try{
             refreshToken=JWT.signRefreshToken({_id:user._id,name:user.userName},"30d");
             accessToken=JWT.signAccessToken({_id:user._id},"15m");
            
        }
        catch(error){
            return next(error);
        }

        //7  Save the refresh token to the database
            await JWT.saveToken(user._id,refreshToken);
            res.cookie("refreshToken",refreshToken,{httpOnly:true});
            res.cookie("accessToken",accessToken,{httpOnly:true});

            
        //8 Save the user to the database
            const registeredUser=await user.save();
        //9 Make User Data Transfer Object (DTO)
            const userData=userDTO(registeredUser);

        //10 Send back the user and the token in response
        return res.status(200).json({user:userData,auth:true});
    },
    async logout(req, res,next) {
        console.log("logout called ");
        try{
            const current_refreshToken=req.cookies.refreshToken;
            console.log(current_refreshToken)
            await RefreshToken.deleteOne({refreshToken:current_refreshToken});
        }
        catch(error){
            return next(error);
        }

        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");
        return res.status(200).json({message:"Logged out successfully"});
    }



}
module.exports = authController;