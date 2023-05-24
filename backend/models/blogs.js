const mongoose=require('mongoose');
const {Schema}=mongoose;

const BlogSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User",
    },
    photoPath :{
        type:String,
        required:true
    }
},{timestamps:true});

Blog=mongoose.model("Blog",BlogSchema,"Blogs");
module.exports=Blog;

