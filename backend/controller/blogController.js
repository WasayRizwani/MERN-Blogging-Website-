
const joi=require("joi");
const Blog=require("../models/blogs");
const mongoidRegex= /^[0-9a-fA-F]{24}$/;
const {v4:uuidv4}=require("uuid");
const fs=require("fs");
const blogDTO=require("../dto/blogDTO");
const {BACKEND_PATH}=require("../config/index");
const blogDetailsDTO=require("../dto/blogDetailsDTO");
const blogController = {
    getAllBlogs: async (req, res,next) => {
        let blogDto
        try{
            const blogs=await Blog.find({})
            blogDto=[]
            for (i of blogs){
              blogDto.push(blogDTO(i));
            }

        }
        catch(error){
            return next(error);
        }
        res.status(200).json(blogDto);

    },
    createBlog: async(req, res,next)=> { 
        const blogSchema=joi.object({
            title:joi.string().min(3).max(50).required(),
            content:joi.string().min(3).max(3000).required(),
            photoPath:joi.string().required(),
            author:joi.string().regex(mongoidRegex).required()
        });
        const {error}=blogSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        const {title,content,photoPath,author}=req.body;   

        const buffer=Buffer.from(photoPath.replace(/^data:image\/(png|jpg|jpeg);base64,/,''),"base64");

        const photoName=uuidv4()+".jpg";

        const photosavePath=BACKEND_PATH+"storage/"+photoName;

        let  blog;
        fs.writeFileSync("storage/"+photoName,buffer);
        try{
            blog=new Blog({
                title,
                content,
                photoPath:photosavePath,
                author
            });
            await blog.save();

           
        }
        catch(error){
            return next(error);
        }
        res.status(200).json(blogDTO(blog));      


    },
    getBlogById: async(req, res,next)=> {
        const idSchema=joi.object({
            id:joi.string().regex(mongoidRegex).required()
        });
        const {error}=idSchema.validate(req.params);
        if (error) {
            return next(error);
        }
        const {id}=req.params;
     
        let blogDto;
        try{
            const Blogs=await Blog.findOne({_id:id}).populate("author");

          res.status(200).json(blogDetailsDTO(Blogs));

        }

        catch(error){
            return next(error);
        }

    },
    updateBlog: async(req, res,next)=> {
        const updateSchema=joi.object({
            title:joi.string().min(3).max(50).required(),
            content:joi.string().min(3).max(3000).required(),
            photoPath:joi.string(),
            blogId:joi.string().regex(mongoidRegex).required(),
            author:joi.string().regex(mongoidRegex).required()
        });
        const {error}=updateSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        const {title,content,photoPath,blogId}=req.body;

        let blog;
        try{
            blog =await Blog.findOne({_id:blogId});
            if(!blog){
                return next(new Error("Blog not found"));
            }
            
        }
        catch(error){
            return next(error);
        }
        if(photoPath){
            previousePhotoPath=blog.photoPath;
            const buffer=Buffer.from(photoPath.replace(/^data:image\/(png|jpg|jpeg);base64,/,''),"base64");
            const photoName=uuidv4()+".jpg";
            const photosavePath=BACKEND_PATH+"storage/"+photoName;
            fs.writeFileSync("storage/"+photoName,buffer);
            blog.photoPath=photosavePath; 
            blog.title=title;
            blog.content=content;
            
            fs.unlinkSync(previousePhotoPath);
            await Blog.updateOne({_id:blogId},{title,content,photoPath:photosavePath})   
        }   
        else{
          
            await Blog.updateOne({_id:blogId},{title,content})
           

        }

        res.status(200).json({"message":"Blog updated successfully"});
        
    
    },
    deleteBlog: async(req, res,next)=> {
        const idSchema=joi.object({
            id:joi.string().regex(mongoidRegex).required()
        });
        const {error}=idSchema.validate(req.params);
        if (error) {
            return next(error);
        }
        const {id}=req.params;
        let blog;
        try{
            blog=await Blog.findOne({_id:id});
            if(!blog){
                return next(new Error("Blog not found"));
            }
            imageName=blog.photoPath.split("/").pop();
            fs.unlinkSync("storage/"+imageName);
            await Blog.deleteOne({_id:id});
        }
        catch(error){
            return next(error);
        }
        res.status(200).json({"message":"Blog deleted successfully"});
    }
}
module.exports = blogController;