const profileImage=document.querySelector("#profileImage");
const profilePhoto=document.querySelector(".profile-photo");

profilePhoto.addEventListener("click",function(e){

})



profileImage.addEventListener("change",async function(e){
    e.preventDefault();
    try{
        let file= profileImage.files[0]; 

 
        console.log(file);
      
        let formData=new FormData();
        formData.append("user",file);
        let obj =await axios.patch("https://food-thekaa.onrender.com/api/users/updateprofilephoto",formData);
        console.log(obj);
        if(obj.data.message){
            window.location.reload();
        }
    
    }
    catch(error){
        console.log(error);
    }
    
});