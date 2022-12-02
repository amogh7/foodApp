
let resetPassword=document.querySelector("#pass-reset");
let resetConfirmPassword=document.querySelector("#conpass-reset");
let resetButton=document.querySelector(".reset-button");
resetButton.addEventListener("click",async function(e){
    try{
        e.preventDefault();
        console.log("inside");
       let token=document.URL.split("/");
       token=token[token.length-1];
       if(resetPassword.value && resetConfirmPassword.value){
           
        let obj=await axios.patch(`https://food-thekaa.onrender.com/api/users/resetpassword/${token}`,{password:resetPassword.value,confirmPassword:resetConfirmPassword.value});
        console.log(obj);
        if(obj.data.message){
            message.innerHTML="successfully changed";
        }
       }
     
       
    }  
    catch(error){
        console.log(error);
    }
   });