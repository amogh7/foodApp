const express = require("express");
const app = express();
const nodemailer=require("nodemailer");

async function sendEmail()
{
  try{
    var transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ba58a65b70a6f4",
        pass: "c03ec4ed7693b9"
      }
    });

await transporter.sendMail({
  from:"amoghsachdeva3@gmail.com",
  to:"abcd@test.com",
  subject:"Hello",
  text:"Hello i am testing node mailer !!",
  html:"<b>Hello  I am testing this stuff!!!<b>",
});


  } catch(error){
    return error;
  }
 }

 sendEmail().then(function(){
   console.log("Email Sent !!");
 }).catch(function(){
   console.log("Email not sent");
 });
  















// use wala method hmesha chalta hai
// app.use(   )
// app.use(express.json());

// app.use( isAdmin( [ "admin"  , "restaurantOwner"] )  );

// 100 methiods => isAdmin true
// app.get("" ,  getAll );
// app.post("" ,  deleteAll );
// app.patch("" , updateAll);

// function isAdmin(roles){
// //roles
// // closure
//     return function(req , res , next){
//         console.log("inside middle ware function");
//         console.log(req.body.role);

//         if(roles.includes(req.body.role)){
//             next();
//         }else{
//             res.json({
//                 message:"You are not authorized !!!"
//             })
//         }
//     }
// }

// function getAll(req , res){
//     res.json({
//         data:"All users !!!"
//     })
// }

// function checkGet(){
//     // res.json({
//     //     data: "check get function called !!!"
//     // })
//     console.log("Inside check Get function");

//     return function(req , res){
//         res.json({
//             data:"I am returned from checkGet function"
//         })
//     };
// }

app.listen(5500, function () {
    console.log("Server started at 5500 !!");
  });