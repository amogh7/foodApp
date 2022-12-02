let mongoose=require("mongoose");
// let {DB_LINK} =require("../config/secrets");
const DB_LINK=process.env.DB_LINK;

mongoose.connect(DB_LINK,{useNewUrlParser:true,useUnifiedTopology:true})
.then(function(db){
    console.log("db created");
}).catch(function(err){
console.log("not connected to db");
});
const bookedPlanSchema=new mongoose.Schema({
    planId:{

    },
    planName:{

    },
    currentprice:{
        type:Number,
        required:true
    },
    bookedOn:{
        type:String,
        default:Date.now()
    }
})
const bookingSchema=new mongoose.Schema({
userId:{
    type:String,
    required:true
},
bookedPlans:{
    type:[bookedPlanSchema],
    required:true

}
})

const bookingModel=mongoose.model("bookingcollection",bookingSchema);
module.exports=bookingModel;




//bookedPlanShcema