const express=require("express");
const app=express();
const multer=require("multer");



app.use(express.static("public"));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.fieldname == "user"){
            cb(null, 'public/img/users')
        }else if(file.fieldname == "plan"){
            cb(null , 'public/img/plans')
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+".jpg")
    }
});
function fileFilter (req, file, cb) {
    // To reject this file pass `false`, like so:
    console.log(file);
    if(file.mimetype.includes('image')){
        cb(null, true)
    }else{
        cb(null, false)
    }
  }

  const upload=multer({storage:storage,fileFilter:fileFilter});
app.post("/uploadprofilephoto",upload.single("user"),function(req,res){
           console.log("file",req.file);
});

app.listen(3000,function(){
    console.log("app running at port 3000...");
})