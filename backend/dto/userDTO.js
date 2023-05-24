userDTO=(user)=>{
    return {
        name:user.name,
        userName:user.userName,
        email:user.email,
        _id:user._id
    }
};
module.exports=userDTO;