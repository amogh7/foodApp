let email=document.querySelector("#email");
let pw =document.querySelector("#pass");
let loginBtn=document.querySelector(".signin");
let message=document.querySelector("#message");
let forgetPassword = document.querySelector(".forgot");
const setTimeoutPromise = timeout => new Promise(resolve => {
    setTimeout(resolve, timeout);
});

forgetPassword.addEventListener("click" , async function(e){
    try{
        e.preventDefault();
        if(email.value){
            let obj = await axios.post("https://food-thekaa.onrender.com/api/users/forgetpassword" , {email:email.value});
            console.log(obj);
            if(obj.data.message){
                
                message.innerHTML="Successfuly sent Check Your Email";
                await setTimeoutPromise(3000);
                window.location.href = "/";
            }
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
            let obj = await axios.post("https://food-thekaa.onrender.com/api/users/login",{email:email.value,password:pw.value});
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