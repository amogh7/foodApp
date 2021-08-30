const express=require("express");
const { protectRoute } = require("../Controller/AuthController");
const { createPaymentSession } = require("../Controller/bookingController");
const planModel = require("../Model/plansModel");
const userModel = require("../Model/usersModel");
const stripe = require('stripe')('sk_test_51JTXZaSA7ZYmi6JqjB0EQAdNHzOAlqlEhN83xSASlgKdmn9qsT230fAXCEmAKghK5A2SQ8aYp8vA8AwZrf9a70Kq00kLQVwEIz');
const bookingRouter=express.Router();
bookingRouter.use(protectRoute);
bookingRouter.post("/createpaymentsession",createPaymentSession)


module.exports=bookingRouter;