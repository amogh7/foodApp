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
           
        let obj=await axios.patch(`http://localhost:3000/api/users/resetpassword/${token}`,{password:resetPassword.value,confirmPassword:resetConfirmPassword.value});
        console.log(obj);
       }
       
    }  
    catch(error){
        console.log(error);
    }
   });