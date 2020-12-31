let email=document.querySelector("#email");
let username=document.querySelector("#name");
let pw =document.querySelector("#pass");
let cpw=document.querySelector("#con-Pass");
let signupBtn=document.querySelector(".signin");


signupBtn.addEventListener("click",async function(e){
    try{
        e.preventDefault();
        if(email.value && pw.value&&username.value&&cpw.value){
            let signupObj={
                name:username.value,
                email:email.value,
                password:pw.value,
                confirmPassword:cpw.value
            }
            let obj = await axios.post("http://localhost:3000/api/users/signup",signupObj);
            console.log(obj);
        }
    }
    catch(error){
        console.log(error);
    }
});