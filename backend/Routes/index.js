const express=require("express");
const router=express.Router();
const authController=require("../controller/authController");
const authMiddleware=require("../middleware/auth");
router.get("/",(req,res)=>{
    res.send("hello world2");
});
//Authentication Routes 
router.post("/login",authController.login);
router.post("/register",authController.register);
router.post("/logout",authMiddleware,authController.logout);

//Blog Routes
const blogController=require("../controller/blogController");
router.get("/blog/all",authMiddleware,blogController.getAllBlogs);
router.get("/blog/:id",authMiddleware,blogController.getBlogById);
router.post("/blog",authMiddleware,blogController.createBlog);
router.put("/blog",authMiddleware,blogController.updateBlog);
router.delete("/blog/:id",authMiddleware,blogController.deleteBlog);


module.exports=router;