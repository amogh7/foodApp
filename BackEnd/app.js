const express=require("express");
const PlanRouter = require("./Router/planRouter");
// let plans =require("./db/plans.json");
// const fs=require("fs");
// let userDb=require("./db/users.json");

const userRouter = require("./Router/userRouter");

const viewRouter=require("./Router/viewRouter");

const path=require("path");


const app=express();





//middlewares
//user defined middlewares
// app.use(function(req,res,next){
//     console.log("I am called before express.json");
//     console.log(req.body);
//     next();
// });
// it tracks incoming request and see if there is data in the request => the data will be fed in req.body

app.use(express.json());
app.use(express.static("public"));
// app.use(function(req,res,next){
//     console.log("I am called after express.json");
// });

//app.httpmethod(appRoute,cb function(req,res));

app.set("view engine","pug");
app.set("views",path.join(__dirname,"view"));

app.use("/api/plans",PlanRouter); 
app.use("/api/users",userRouter);
app.use("/",viewRouter);

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

app.listen(3000,function(){
    console.log("server started at port 3000" );
});

