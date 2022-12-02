let email = document.querySelector("#email");
let username = document.querySelector("#name");
let pw = document.querySelector("#pass");
let cpw = document.querySelector("#con-Pass");
let signupBtn = document.querySelector(".signin");

const setTimeoutPromise = timeout => new Promise(resolve => {
    setTimeout(resolve, timeout);
});

signupBtn.addEventListener("click", async function (e) {
    try {
        e.preventDefault();
        if (email.value && pw.value && username.value && cpw.value) {
            let signupObj = {
                name: username.value,
                email: email.value,
                password: pw.value,
                confirmPassword: cpw.value
            }
            let obj = await axios.post("https://food-thekaa.onrender.com/api/users/signup", signupObj);
            console.log(obj);
            if (obj.data.data) {
                console.log("bye")
                message.innerHTML = obj.data.message;
                await setTimeoutPromise(3000);
                let obj2 = await axios.post("https://food-thekaa.onrender.com/api/users/login", { email: email.value, password: pw.value });
                console.log(obj2);
                if (obj2.data.data) {
                    window.location.href = "/";
                }




            }
            else if (obj.data.error.errors) {
                console.log("hello")
                let str = obj.data.error.errors.confirmPassword.message + " "
                console.log(str);
                message.innerHTML = str;
            }
            else if (obj.data.error.keyValue) {
                message.innerHTML = "Email Already Exists";
            }

            else {
                message.innerHtml = obj.data.error.message;
            }

        }
    }
    catch (error) {
        console.log(error);
    }
});