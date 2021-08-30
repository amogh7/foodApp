const planModel = require("../Model/plansModel");
const userModel = require("../Model/usersModel");
const bookingModel=require("../Model/bookingModel")
const stripe = require('stripe')('sk_test_51JTXZaSA7ZYmi6JqjB0EQAdNHzOAlqlEhN83xSASlgKdmn9qsT230fAXCEmAKghK5A2SQ8aYp8vA8AwZrf9a70Kq00kLQVwEIz');
async function createPaymentSession(req,res){
    try{
               const userId=req.id;
             const {planId}=req.body;
           const plan=await planModel.findById(planId);
           console.log(plan);
           const user =await userModel.findById(userId);
             const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                customer_email:user.email,
                line_items: [
                  {
                    price_data: {
                      currency: 'usd',
                      product_data: {
                        name: plan.name,
                      },
                      unit_amount: plan.price,
                    },
                    quantity: 1,
                  },
                ],
                mode: 'payment',
                success_url: 'https://food-thekaaa.herokuapp.com/',
                cancel_url: 'https://food-thekaaa.herokuapp.com/',
    })
    res.json({
        session
    })
}
    catch(error){
            res.json({
                message:"failed to create message",
                error
            })
    }
}
// async function createnewBooking(req,res){
//     //booking collection-> if(user.bookedplanid){
// // push in bookedplans
//     // }
//     // else
//     // new booking document
//     // id
// }

module.exports.createPaymentSession=createPaymentSession;
