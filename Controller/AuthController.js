let userModel=require("../Model/usersModel");
const jwt=require("jsonwebtoken");
// const { SECRET_KEY , GMAIL_ID , GMAIL_PW } = require("../config/secrets");
const cookieParser=require("cookie-parser");
const nodemailer = require("nodemailer");

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const SECRET_KEY=process.env.SECRET_KEY;
const GMAIL_ID=process.env.GMAIL_ID;
const GMAIL_PW=process.env.GMAIL_PW;

async function sendEmail(message) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: GMAIL_ID ,
        pass: GMAIL_PW,
      },
    });

    let res = await transporter.sendMail({
      from: message.from, // sender address
      to: message.to, // list of receivers
      subject: message.subject, // Subject line
      text: message.text, // plain text body
    });
    return res;
  } catch (error) {
    return error;
  }
}





async function signup(req,res){
try{
       let user=req.body;
      let newUser=await userModel.create({
           name:user.name,
           email:user.email,
           password:user.password,
           confirmPassword:user.confirmPassword,
           role:user.role

       });
       console.log(newUser);
       res.status(201).json({
           message:"Successfully Signed up ",
           data:newUser,
       });

}
catch(error){
    res.status(201).json({
        message:"Sign up Failed ",
        error:error,
    });
}
}


async function logout(req,res){
    try{
           res.clearCookie('jwt');
           res.redirect('/');
    }
    catch(error){
        res.status(501).json({
            error
        });
             
    }
}

async function isLoggedIn(req,res,next){
    try{
        let token=req.cookies.jwt;
        const payload=jwt.verify(token,SECRET_KEY);
        if(payload){
           let user= await userModel.findById(payload.id);
           req.name=user.name;
           req.user=user;
           next();
        }
        else{
            next();
        }

    }
    catch(error){
        next();
    }
    
}

async function login(req,res){
    try{
           let {email,password}=req.body;
           console.log(email,password);
           let loggedInUser=await userModel.find({email:email});
           if(loggedInUser.length){
               let user=loggedInUser[0];
               if(user.password==password){
                   const token=jwt.sign({id:user["_id"]},SECRET_KEY);
                   res.cookie('jwt',token,{httpOnly:true});
                   
                   res.status(200).json({
                       message:"loged in Successfuly",
                       data:loggedInUser[0],
                    //    token,
                   });
               }else{
                   res.status(200).json({
                       message:"Email and password did not match"
                   });
               }

           }
           else{
               res.status(200).json({
                   message:"No user found signUp First"
               });
           }

    }
    catch(error){
        res.status(501).json({
            message:"login failed",
            error,
        }); 
    }
}

async function protectRoute(req,res,next){
    try{
        // const token=req.headers.authorization.split(" ").pop();
        // console.log(token);
        const token =req.cookies.jwt;
        console.log(token);
        console.log("Inside protect route");
        const payload=jwt.verify(token,SECRET_KEY);
        console.log(payload);
        if(payload){
            req.id=payload.id;
            next();
        }
        else{
            res.status(501).json({
                message:"Please Log in"
            });
        }
    }
    catch(error){
        res.status(501).json({
            message:"Please Log in",
            error
        });
    }
}

async function isAuthorized(req , res , next){
    try{
      let id = req.id;
      let user = await userModel.findById(id);
      console.log(user);
      if(user.role == "admin"){
        next();
      }else{
        res.status(200).json({
          message:"You dont have admin rights !!!"
        })
      }
    }
    catch(error){
      res.status(501).json({
        message:"Failed to Authorize",
        error
      });
    }
  }

  async function forgetPassword(req,res){
      try{
           const {email}=req.body;
        //    console.log(email);  
        let user=await userModel.findOne({email:email});
        console.log(user);
        if(user){
            let token=user.createResetToken();
            console.log(token);
            let updatedUser=await user.save({validateBeforeSave:false});
                console.log(updatedUser);
                let resetLink=`https://food-thekaaa.herokuapp.com/resetpassword/${token}`;
                let message = {
                    from:GMAIL_ID,
                    to:user.email,
                    subject:"Reset Password",
                    text:"link to reset your passwor is "+resetLink
                  }
                  let response = await sendEmail(message);

                res.status(201).json({
                    message:"sent successfuly",
                    response,
                });

                  }
                  else{
                      res.statu(404).json({
                          message:"User Not found ! please Sign up First"
                      });
                  }
      }
      catch(error){
        res.status(501).json({
            message:"Failed to forget",
            error
        });
      }
  }
  async function resetPassword(req,res){
      try{
          const token=req.params.token;
          const {password,confirmPassword}=req.body;
          const user=await userModel.findOne({
            pwToken:token,
            tokenTime:{$gt:Date.now()}
          });
          console.log(user);
          console.log(password,confirmPassword);
          if(user){
              user.resetPasswordHandler(password,confirmPassword);
              await user.save();
              res.status(201).json({
                  message:"Pasword Reset Successful !!!"
              });
            }
              else{
              res.status(404).json({
                message:"Pasword Reset Link expired!!!"
            });
        }

              
          }
      
      catch(error){
        res.status(501).json({
            message:"Pasword Reset Failed !!!",
            error
        });

      }
  }
module.exports.isAuthorized=isAuthorized;
module.exports.signup=signup;
module.exports.login=login;
module.exports.protectRoute=protectRoute;
module.exports.forgetPassword=forgetPassword; 
module.exports.resetPassword=resetPassword;
module.exports.isLoggedIn=isLoggedIn;
module.exports.logout=logout;
