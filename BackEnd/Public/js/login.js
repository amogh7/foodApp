let email=document.querySelector("#email");
let pw =document.querySelector("#pass");
let loginBtn=document.querySelector(".signin");


loginBtn.addEventListener("click",async function(e){
    try{
        e.preventDefault();
        if(email.value && pw.value){
            let obj = await axios.post("http://localhost:3000/api/users/login",{email:email.value,password:pw.value});
            console.log(obj);
        }
    }
    catch(error){
        console.log(error);
    }
})