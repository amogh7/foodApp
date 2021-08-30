const express=require("express");
const { protectRoute, isAuthorized } = require("../Controller/AuthController");

const PlanRouter=express.Router();

const{
getAllPlans,
createPlan,
getPlanById,
updatePlanById,
deletePlanById,


}=require("../Controller/planController");

PlanRouter
.route("")
.get(protectRoute,getAllPlans)
.post(createPlan);

PlanRouter
  .route("/:id")
  .get( protectRoute , getPlanById)
  .patch( protectRoute ,isAuthorized,  updatePlanById)
  .delete( protectRoute, isAuthorized , deletePlanById);







module.exports=PlanRouter;


