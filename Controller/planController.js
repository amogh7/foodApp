// const plans=require("../Model/plansModel.json");

// const {v4:uuidv4}=require("uuid");

// const fs=require("fs");

// let path=require("path");

const planModel=require("../Model/plansModel");

//mongo db
async function getAllPlans(req,res){
try{
    let plans=await planModel.find({});
    res.status(200).json({
        message:"Successfuly got all plans",
        data:plans
    });
}
catch(error){
res.status(501).json({
    message:"Failed to get plans",
    error:error
});
}
}

//local database
// function getAllPLans(req,res){
//     if(plans.length){
//         res.status(200).json(
//             {
//                 message:"Successfuly got all plans",
//                 data:plans,
//             }
//         );
//     }
//     else{
//         res.status(404).json(
//             {
//                 message:"No  plans found",
                
//             }   
//         );
//     }
// }
//mongodb and using promise
function createPlan(req,res){
    let plan=req.body;
    planModel.create(plan).then(function(plan){
        res.status(200).json({
            message:"plan created successfuly",
            data:plan
        });
    }).catch(function(error){
        res.status(501).json({
            message:"Failed to create plan",
            error:error.errors.discount.message
        });
    });
}

//local database
// function createPlan(req,res){
//     let plan =req.body;
//     plan.id=uuidv4();
//     plans.push(plan);
//     let plansPath=path.join(__dirname,'..','Model','plansModel.json');
//     fs.writeFileSync(plansPath ,JSON.stringify(plans));

//     res.status(201).json({
//         message:"created a plan",
//         data:plans,

//     });
// }


async function deletePlanById(req,res){
    try{
        let {id}=req.params;
        let deletedPlan=await planModel.findByIdAndDelete(id);
        res.status(200).json({
            message:"Successfuly deleted",
            data:deletedPlan            
        });
              
    }
    catch(error){
                res.status(501).json({
                    message:"failed to delete",
                    error:error,
                });
    }
}


//local database
// function deletePlanById(req,res){
//     let {id}=req.params;
//     let filteredPlans=plans.filter(function(plan){
//         return plan.id!=id;
//     });

//     if(filteredPlans.length==plans.length){
//         res.status(404).json({
//             message:"Plan not found"
//         });
//     }
//     else{
//         let plansPath=path.join(__dirname,'..','Model','plansModel.json');
//         fs.writeFileSync(plansPath,JSON.stringify(filteredPlans));
//         res.status(200).json({
//             message:"sucessfully deleted",
//             data:filteredPlans
//         });
//     }
// }

async function getPlanById(req,res){
    try{
        let {id}=req.params;
        let plan=await planModel.findById(id);
        res.status(201).json({
            message:"Successfuly sent",
            data:plan
        });

    }
    catch(error){
        res.status(501).json({
            message:"failed to send",
            error:error
        });
    }
}



// function getPlanById(req,res){
//     let {id}=req.params;
//     let filteredPlans=plans.filter(function(plan){
//            return plan.id==id;
//     });
//     if(filteredPlans.length){ 
//         res.status(200).json({
//             message:"successfuly updated",
//             data:filteredPlans
//         });
//     }
//     else{
//       res.status(404).json(
//           {
//               message:"No  plans found",
              
//           }   
//       );
//   }
// }



async function updatePlanById(req,res){
 try{
     let id=req.params.id;
    let {updateObj}=req.body;

    // let updatedPlan= await planModel.findByIdAndUpdate(id,updateObject,{new:true});//validation for discount will not work
   let plan=await planModel.findById(id);
   for(key in updateObj){
       plan[key]=updateObj[key];
   }
  let updatedPlan=await plan.save();
    res.status(200).json({
        message:"updated plan Successfuly",
        data:updatedPlan
    });
}
catch(error){
    res.status(501).json({
        message:"failed to update plan",
        error:error.errors.discount.message
    });
}

}
//local db
// function updatePlanById(req,res){
//     let {id}=req.params;
//      let updatedObject=req.body;

//      let filteredPlan=plans.filter(function(plan){
//         return plan.id==id;
//      });


//      if(filteredPlan.length){
//          let plan=filteredPlan[0];
//          for(key in updatedObject){
//              plan[key]=updatedObject[key];
//          }
//          let plansPath=path.join(__dirname,'..','Model','plansModel.json');
//          fs.writeFileSync(plansPath,JSON.stringify(plans));
//          res.status(200).json({
//              message:"plan updated",
//          });
//      }
//      else{
//          res.status(404).json({
//              message:"plan not found", 
//          })

//      } 
// }

module.exports.getAllPlans=getAllPlans;
module.exports.createPlan=createPlan;
module.exports.deletePlanById=deletePlanById;
module.exports.getPlanById=getPlanById;
module.exports.updatePlanById=updatePlanById;