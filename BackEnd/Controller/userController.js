// const Userdb=require("../Model/usersModel");
// const {v4:uuidv4}=require("uuid");

// const fs=require("fs");

const userModel=require("../Model/usersModel");
//local db
function getAllUsers(req,res){
    if(userDb.length){
        res.status(201).json({
             message:"Succsessfully got all users",
             data:userDb
        }

        );
        
}
else{
        res.status(200).json({
            message:"no users found"
        });
} 

}
async function updateProfilePhoto(req,res){
  try{
    let file = req.file;
    console.log(file);
    let imagePath = file.destination+"/"+file.filename;
    imagePath = imagePath.substring(6);
    
    let id = req.id;
    let user = await userModel.findById(id);
    user.pImage = imagePath;
    await user.save({validateBeforeSave:false}); 
    res.json({
      message:"Profile Photo updated !!"
    });

         
  }
  catch(error){
      res.status(200).json({
          message:"failed to update photo !!",
          error
      })

  }
}


//local db
function createUser(req,res){
    let user=req.body;
    user.id=uuidv4();
    userDb.push(user);
    let userPath=path.join(__dirname,'..','Model','userModel.json');
    fs.writeFileSync(userPath,JSON.stringify(userDb));
    res.status(201).json({
        message:"created a plan",
        data:userDb,

    });
}
async function deleteUserById(req, res) {
    try{
      let id = req.id;
      let deletedUser =await userModel.findByIdAndDelete(id);
      if(deletedUser){
        res.status(200).json({
          message:"User deleted Succesfulyy !!",
          data : deletedUser
        })
      }
      else{
        res.status(200).json({
          message:"User not Found !!!"
        });
      }
    }
    catch(error){
      res.status(501).json({
        message:"Failed to delete",
        error
      });
    }
  }
//local db
// function deleteUserById(req,res){
//         let {id}=req.params;
//         let filterdUsers=userDb.filter((user)=>{
//             return user.id!=id;
//         });
        
//         if(filterdUsers.length==userDb.length){
//             res.status(404).json({
//                 message:"no user found"
//             });
//         }
//         else{
//             let userPath=path.join(__dirname,'..','Model','userModel.json');
//             fs.writeFileSync(userPath,JSON.stringify(filterdUsers));
//             res.status(201).json({
//                 message:"Sucessfully deleted",
//                 data:filterdUsers
//             });
        
//         }
//     }
    async function updateUserById(req,res){
        try{
            let id=req.id;
            let updateObj=req.body.updateObj;
            // console.log(updateObj);
            let user =await userModel.findById(id);
           
            for(key in updateObj){
              user[key]=updateObj[key];
            }
            let updatedUser=await user.save();
            res.status(201).json({
                message:"updated User",
                data:updatedUser
            });
        }
        catch(error){
            res.status(501).json({
                message:"Failed to update user",
                error
              });
        }
        
    }
    //local db
    // function updateUserById(req,res){
    //     let {id}=req.params;
    //     let updatedObject=req.body;
    
    //     let filteredUser=userDb.filter(function(user){
    //        return user.id==id;
    //     });
    
    
    //     if(filteredUser.length){
    //         let user=filteredUser[0];
    //         for(key in updatedObject){
    //             user[key]=updatedObject[key];
    //         }
    //         let userPath=path.join(__dirname,'..','Model','userModel.json');

    //         fs.writeFileSync(userPath,JSON.stringify(userDb));
    //         res.status(200).json({
    //             message:"user updated",
    //         });
    //     }
    //     else{
    //         res.status(404).json({
    //             message:"user not found", 
    //         });
    
    //     }
    // }
//mongo db
    async function getUserById(req,res){
        try{
            let id=req.id;
            let user =await userModel.findById(id);
            console.log(user);
            res.status(200).json({
                message:"Got user by id ",
                data:user
            });
        }
       
        catch(error){
            res.json({
                message:"Failed to get user !!!",
                error
              })
        }
    }

    //local db
    // function getUserById(req,res){
    //     let {id}=req.params;
    //     let filteredObject=userDb.filter( (user) => {
    //             return user.id==id;
    //     });
        
    //     if(filteredObject.length){
    //         res.status(200).json({
    //             message:"Successfully got user",
    //             data:filteredObject
    //         });
    //     }
    //     else{
    //         res.status(404).json({
    //             message:"NO user found",
              
    //         });
    //     }
    // }


    module.exports.getAllUsers=getAllUsers;
    module.exports.createUser=createUser;
    module.exports.deleteUserById=deleteUserById;
    module.exports.updateUserById=updateUserById;
    module.exports.getUserById=getUserById;
    module.exports.updateProfilePhoto=updateProfilePhoto;

