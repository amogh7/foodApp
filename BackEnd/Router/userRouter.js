const express=require("express");
const { signup, login, protectRoute,forgetPassword ,resetPassword} = require("../Controller/AuthController");
const userRouter=express.Router();

const{
    getAllUsers, createUser,getUserById,updateUserById,deleteUserById
    
}=require("../Controller/userController")

userRouter.post("/signup",signup);
userRouter.post("/login",login);
userRouter.post("/forgetPassword",forgetPassword);
userRouter.patch("/resetpassword/:token",resetPassword);
// userRouter.route("").get(getAllUsers).post(createUser);

userRouter.route("")
.get(protectRoute,getUserById)
.patch(protectRoute,updateUserById)
.delete(protectRoute,deleteUserById);


module.exports=userRouter;
