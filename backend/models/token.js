const mongoose=require('mongoose');
const {Schema}=mongoose;
const refreshTokenSchema=new Schema({
    refreshToken:{
        type:String,
        required:true 
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User",
    }
},{timestamps:true});

RefreshToken=mongoose.model("RefreshToken",refreshTokenSchema,"RefreshTokens");
module.exports=RefreshToken;