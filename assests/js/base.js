let resetpassword=document.getElementById('resetPassword');
let close=document.getElementById('close');
let submit=document.getElementById('pass-submit');


submit.addEventListener('click',function(event){
    let changepassword=document.getElementById('changePassword');
    if(changepassword.elements[0].value!==changepassword.elements[1].value){
        alert("password and retype password doesn't match");
        event.preventDefault();
    }
    else{
        alert("successfully password changed");
    }
    
    
})

resetpassword.addEventListener("click",function(event){
    event.preventDefault();
    document.getElementById("bg-model").style.display="flex";
})


close.addEventListener('click',function(){
    document.getElementById('bg-model').style.display="none";
});