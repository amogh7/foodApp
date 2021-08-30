const express=require("express");
const { signup, login, protectRoute,forgetPassword ,resetPassword, } = require("../Controller/AuthController");

const userRouter=express.Router();

const multer=require("multer");

const storage = multer.diskStorage({
    destination: function(req , file , cb){
      cb(null , "Public/images/users")
    } ,
    filename : function(req , file , cb){
      cb(null , `user${Date.now()}.jpg`);
    } 
  })
  
  function fileFilter(req , file , cb){
    if(file.mimetype.includes("image")){
      cb(null , true);
    }
    else{
      cb(null , false);
    }
  }

const upload=multer({storage:storage,fileFilter:fileFilter});

const{
    getAllUsers, createUser,getUserById,updateUserById,deleteUserById,updateProfilePhoto
    
}=require("../Controller/userController")

userRouter.post("/signup",signup);
userRouter.post("/login",login);
userRouter.post("/forgetPassword",forgetPassword);
userRouter.patch("/resetpassword/:token",resetPassword);
// userRouter.route("").get(getAllUsers).post(createUser);

userRouter.use(protectRoute);

userRouter.patch("/updateprofilephoto",upload.single("user"),updateProfilePhoto);


userRouter.route("")
.get(getUserById)
.patch(updateUserById)
.delete(deleteUserById);


module.exports=userRouter;
