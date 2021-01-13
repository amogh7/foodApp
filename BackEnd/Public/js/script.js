let names=["EVERYONE" ,"DEVELOPERS","FITNESS FREAKS","VEGANS"];
let element=document.querySelector(".last-part");
let idx=0;
let word=names[idx];
let isDeleting=false;
let text="";
let navlinks = document.querySelector(".nav-links");
let navlink = document.querySelector(".navbar");
let showcase = document.querySelector("header");

window.addEventListener("load",function(){
    typewords();
 
    window.addEventListener("scroll" , function(){
        
        let {bottom} = showcase.getBoundingClientRect();
        if(bottom <= 0 ){
            navlinks.classList.add("fixed");
            navlink.classList.add("arrange");
        }else{
            if(navlinks.classList.contains("fixed")){
                navlinks.classList.remove("fixed");
            }
            
            if(navlink.classList.contains("arrange")){
                navlink.classList.remove("arrange");
            }

        }
    });
});


function typewords(){
    
    if(isDeleting&&text.length==0){
          idx=(idx+1)%names.length;
          word=names[idx];
          isDeleting=false;
    }
    if(text.length==word.length){
        isDeleting=true;
    }
    text= isDeleting ? word.substring(0,text.length-1): word.substring(0,text.length+1);
    element.innerHTML=text;

    setTimeout(typewords,text.length==word.length?1000:100);


}