let email=document.querySelector("#email");
let pw =document.querySelector("#pass");
let loginBtn=document.querySelector(".signin");
let message=document.querySelector("#message");
let forgetPassword = document.querySelector(".forgot");


forgetPassword.addEventListener("click" , async function(e){
    try{
        e.preventDefault();
        if(email.value){
            let obj = await axios.post("http://localhost:3000/api/users/forgetpassword" , {email:email.value});
            console.log(obj);
        }
    }
    catch(error){
        console.log(error);
    }
});



loginBtn.addEventListener("click",async function(e){
    try{
        e.preventDefault();
        if(email.value && pw.value){
            let obj = await axios.post("http://localhost:3000/api/users/login",{email:email.value,password:pw.value});
            console.log(obj);
            if(obj.data.data){
                window.location.href="/";
            }
            else{
                message.innerHTML=obj.data.message;
            }    

        }
        
    }
    catch(error){
        console.log(error);
    }
})