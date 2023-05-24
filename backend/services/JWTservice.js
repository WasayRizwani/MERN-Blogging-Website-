const jwt=require('jsonwebtoken');
const {REFRESH_SECRET,ACCESS_SECRET}=require("../config/index");

const refreshTokenModel=require("../models/token");
class JWT{
    constructor(){
       
    }
    static signAccessToken(payload,expiry,secret=ACCESS_SECRET){
        return jwt.sign(payload,secret,{expiresIn:expiry});
    }
    static signRefreshToken(payload,expiry,secret=REFRESH_SECRET){
        return jwt.sign(payload,secret,{expiresIn:expiry});
    }

    static verifyAccessToken(token,secret=ACCESS_SECRET){
        return jwt.verify(token,secret);
    }
    static verifyRefreshToken(token,secret=REFRESH_SECRET){
        return jwt.verify(token,secret);
    }
    static async saveToken(userId,refreshToken){
        try{
            const token=new refreshTokenModel({
                userId:userId,
                refreshToken:refreshToken
            });
            await token.save();
        }
        catch(error){
            console.log("Token saving error",error);
        }
    }
}
module.exports=JWT;