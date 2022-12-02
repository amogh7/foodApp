let mongoose=require("mongoose");
// let {DB_LINK} =require("../config/secrets");
const DB_LINK=process.env.DB_LINK;

mongoose.connect(DB_LINK,{useNewUrlParser:true,useUnifiedTopology:true})
.then(function(db){
    console.log("db created");
}).catch(function(err){
    console.log(err);
    });
let planSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:[40,"Your plan name is more than 40 characters"]
    },
    duration:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    rating:Number,
    discount:{
        type:Number,
        validate:{
            validator:function(){
                return this.discount<this.price;
            },
            message:"Discount should be less than actual price"
        }
    }


});

let planModel=mongoose.model("plansCollection",planSchema);

module.exports=planModel;