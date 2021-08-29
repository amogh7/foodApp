const express=require("express");
// let plans =require("./db/plans.json");
// const fs=require("fs");
// let userDb=require("./db/users.json");
// const {v4:uuidv4}=require("uuid");
const app=express();

const userModel=require("../BackEnd/Model/usersModel");

const jwt = require("jsonwebtoken");
app.post("/tokenCreator",async function(req,res){
     try{                   //payload                        secretKey
    const token=jwt.sign({id:"12123232",name:"amogh"},"fnvjkfjnvksdjfn");
    console.log(token);
    res.json({
        token
    });
}
catch(error){
    res.json({
        message:"Failed to create token"
    });
}
});

app.post("/tokenVerify",function(req,res){
    const {token}=req.body;
    console.log(token);                //secret key
    const payload=jwt.verify(token,"fnvjkfjnvksdjfn")
})




// const app=express();
// //mongoose 
// const mongoose=require("mongoose");

// mongoose.connect("mongodb+srv://admin:admin@cluster0.sjp4y.mongodb.net/<dbname>?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
// .then(function(db){
//     console.log(db);
// });

// let planScema=new mongoose.Schema({
//     name:String,
//     price:Number
// });

// let planModel=mongoose.model("plansCollection",planScema);

// planModel.create({
// name:"Vegan",
// price:50
// }).then((plan)=>{
//     console.log(plan);
// }).catch((error)=>{
//     console.log(error);
// });


//middlewares
//user defined middlewares
// app.use(function(req,res,next){
//     console.log("I am called before express.json");
//     console.log(req.body);
//     next();
// });
// it tracks incoming request and see if there is data in the request => the data will be fed in req.body

app.use(express.json());


// app.use(function(req,res,next){
//     console.log("I am called after express.json");
// });

//app.httpmethod(appRoute,cb function(req,res));

//################################################################users############################################################################ 
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

function createUser(req,res){
    let user=req.body;
    user.id=uuidv4();
    userDb.push(user);
    fs.writeFileSync("./db/users.json",JSON.stringify(userDb));

    
    res.status(201).json({
        message:"created a plan",
        data:userDb,
    });
}


function deleteUserByid(req,res){
        let {id}=req.params;
        let filterdUsers=userDb.filter((user)=>{
            return user.id!=id;
        });
        
        if(filterdUsers.length==userDb.length){
            res.status(404).json({
                message:"no user found"
            });
        }
        else{
            
            fs.writeFileSync("./db/users.json",JSON.stringify(filterdUsers));
            res.status(201).json({
                message:"Sucessfully deleted",
                data:filterdUsers
            });
        
        }
    }

    function updateUserByid(req,res){
        let {id}=req.params;
        let updatedObject=req.body;
    
        let filteredUser=userDb.filter(function(user){
           return user.id==id;
        });
    
    
        if(filteredUser.length){
            let user=filteredUser[0];
            for(key in updatedObject){
                user[key]=updatedObject[key];
            }
            fs.writeFileSync("./db/users.json",JSON.stringify(userDb));
            res.status(200).json({
                message:"user updated",
            });
        }
        else{
            res.status(404).json({
                message:"user not found", 
            });
    
        }
    }
    function getUserByid(req,res){
        let {id}=req.params;
        let filteredObject=userDb.filter( (user) => {
                return user.id==id;
        });
        
        if(filteredObject.length){
            res.status(200).json({
                message:"Successfully got user",
                data:filteredObject
            });
        }
        else{
            res.status(404).json({
                message:"NO user found",
              
            });
        }
    }
//get all users
app.get("/api/users",getAllUsers);
//create a user 
app.post("/api/users",createUser);
//delete user by id
app.delete("/api/users/:id",deleteUserByid);
//update user by id
app.patch("/api/users/:id",UpdateUserByid);

app.get("/api/users/:id",getUserByid);

//###############################################################plan########################################################################
//getAll plans

function getAllPLans(req,res){
    if(plans.length){
        res.status(200).json(
            {
                message:"Successfuly got all plans",
                data:plans,
            }
        );
    }
    else{
        res.status(404).json(
            {
                message:"No  plans found",
                
            }   
        );
    }
}


function createPlan(req,res){
    let plan =req.body;
    plan.id=uuidv4();
    plans.push(plan);
    fs.writeFileSync("./db/plans.json" ,JSON.stringify(plans));

    res.status(201).json({
        message:"created a plan",
        data:plans,

    });
}

function deletePlanById(req,res){
    let {id}=req.params;
    let filteredPlans=plans.filter(function(plan){
        return plan.id!=id;
    });

    if(filteredPlans.length==plans.length){
        res.status(404).json({
            message:"Plan not found"
        });
    }
    else{
        fs.writeFileSync("./db/plans.json",JSON.stringify(filteredPlans));
        res.status(200).json({
            message:"sucessfully deleted",
            data:filteredPlans
        });
    }
}

function getPlanById(req,res){
    let {id}=req.params;
    let filteredPlans=plans.filter(function(plan){
           return plan.id==id;
    });
    if(filteredPlans.length){ 
        res.status(200).json({
            message:"successfuly updated",
            data:filteredPlans
        });
    }
    else{
      res.status(404).json(
          {
              message:"No  plans found",
              
          }   
      );
  }
}

function updatePlanByid(req,res){
    let {id}=req.params;
     let updatedObject=req.body;

     let filteredPlan=plans.filter(function(plan){
        return plan.id==id;
     });


     if(filteredPlan.length){
         let plan=filteredPlan[0];
         for(key in updatedObject){
             plan[key]=updatedObject[key];
         }
         fs.writeFileSync("./db/plans.json",JSON.stringify(plans));
         res.status(200).json({
             message:"plan updated",
         });
     }
     else{
         res.status(404).json({
             message:"plan not found", 
         })

     } 
}

app.get("/api/plans",getAllPLans);
//create a plan
  app.post("/api/plans",createPlan);
//get plan by id
  app.get("/api/plans/:id",getPlanById);
//delete plan by id
app.delete("/api/plans/:id",deletePlanById);
//update plan by id 
app.patch("/api/plans/:id",updatePlanByid);

app.listen(3000,function(){
    console.log("server started at port 3000" );
});

