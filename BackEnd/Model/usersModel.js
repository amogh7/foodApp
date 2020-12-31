let crypto=require("crypto");
let mongoose=require("mongoose");
const { DB_LINK } = require("../config/secrets");
mongoose.connect(DB_LINK,{useNewUrlParser:true,useUnifiedTopology:true})
.then(function(db){
    console.log("db created");
});

let userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:[6,"Password must be greater than 6"]
    },
    confirmPassword:{
        type:String,
        minLength:[6,"Password must be greater than 6"],
        validate:{
            validator:function(){
                return this.password==this.confirmPassword;
            },
            message:"Password did not match"
        }
    },
    role:{
        type:String,
        enum:["admin","user","restaurant owner","delhi"],
        default:"user"
    },
    pwToken:String,
    tokenTime:String
});
//hook-- it will run before function Create. just an example
userSchema.pre("save",function(){
    this.confirmPassword=undefined;
});

userSchema.methods.createResetToken = function(){
    // token bnado
    let token = crypto.randomBytes(32).toString("hex");
    let time = Date.now() * 60 * 10 * 1000;
  
    // token time banado
    this.pwToken = token;
    this.tokenTime = time;
    return token;
    // and set in current document
    // save()
  }
  userSchema.methods.resetPasswordHandler=function(password,confirmPassword){
    this.confirmPassword=confirmPassword
    this.password=password;
    this.pwToken=undefined;
      this.tokenTime=undefined;
  }

let userModel=mongoose.model("usersCollection",userSchema);

module.exports=userModel;

