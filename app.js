const express=require("express");
const PlanRouter = require("./Router/planRouter");
// let plans =require("./db/plans.json");
// const fs=require("fs");
// let userDb=require("./db/users.json");

const userRouter = require("./Router/userRouter");

const viewRouter=require("./Router/viewRouter");
const bookingRouter=require("./Router/bookingRouter");

const path=require("path");


const app=express();
const cookieParser=require("cookie-parser");




//middlewares
//user defined middlewares
// app.use(function(req,res,next){
//     console.log("I am called before express.json");
//     console.log(req.body);
//     next();
// });
// it tracks incoming request and see if there is data in the request => the data will be fed in req.body

app.use(express.json());

app.use(cookieParser());


app.use(express.static("Public"));
// app.use(function(req,res,next){
//     console.log("I am called after express.json");
// });

//app.httpmethod(appRoute,cb function(req,res));

app.set("view engine","pug");
app.set("views",path.join(__dirname,"view"));

app.use("/api/plans",PlanRouter); 
app.use("/api/users",userRouter);
app.use("/",viewRouter);
app.use("/api/plans/booking",bookingRouter);

//################################################################users############################################################################ 
//get all users

// app.get("/api/users",getAllUsers);


// //create a user 
// app.post("/api/users",createUser);
// //delete user by id

// app.delete("/api/users/:id",deleteUserByid);
// //update user by id

// app.patch("/api/users/:id",UpdateUserByid);


// //

// app.get("/api/users/:id",getUserByid);

// //###############################################################plan########################################################################
// //getAll plans

// app.get("/api/plans",getAllPLans);
// //create a plan
//   app.post("/api/plans",createPlan);
// //get plan by id
//   app.get("/api/plans/:id",getPlanById);
// //delete plan by id
// app.delete("/api/plans/:id",deletePlanById);
// //update plan by id 
// app.patch("/api/plans/:id",updatePlanByid);
let port =process.env.PORT || 3000;
app.listen(port,function(){
    console.log("server started at port 3000" );
});

