let buyPlansButtons=document.querySelectorAll(".signup-button a");
let allLis=document.querySelectorAll(".navbar li");
const stripe = Stripe('pk_test_51JTXZaSA7ZYmi6JqdsozxeuESxHhcs6S3xsBxNkR7uBAWKWdcm8rsYPPcmQKLJ43JivlknA5MDkpprkItFzS1Flt002G4BIlfk');

for(let i=0;i<buyPlansButtons.length;i++){
buyPlansButtons[i].addEventListener("click",async function(e){
    e.preventDefault();
    if(allLis.length<6){
             window.location.href="/login";
    }
    else{
        try{
               let planId=buyPlansButtons[i].getAttribute("planid");
               console.log(planId);
               let session=await axios.post("https://food-thekaa.onrender.com/api/plans/booking/createpaymentsession",{planId:planId});
               let sessId=session.data.session.id;
               let result=await stripe.redirectToCheckout({sessionId:sessId});
               console.log(result);
        }
        catch(error)
        {
            alert(error);
        }

    }
})
}