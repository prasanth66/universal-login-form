
let register=document.getElementById('register');
let close=document.getElementById('close');
let submit=document.getElementById('reg-submit');
let loginbutton=document.getElementById('loginButton');

register.addEventListener("click",function(){
    document.getElementById("bg-model").style.display="flex";
    
});

close.addEventListener('click',function(){
      document.getElementById('bg-model').style.display="none";
  });


  //client side validations while registering
submit.addEventListener("click",function(event){
    let login=document.getElementById('login-box');
    if(login.elements[2].value!==login.elements[3].value){
        alert("password and confirm password doesnt match");
        
        event.preventDefault();
    }
    else{
        alert("successfully registered");
    }
   
});

loginbutton.addEventListener('click',function(event){
    
    var response = grecaptcha.getResponse();
    if(response.length == 0) {
        document.getElementById('g-recaptcha-error').innerHTML = '<span style="color:red;">This field is required.</span>';
        event.preventDefault();
        return false;
    }
    return true;
});

function verifyCaptcha() {
    document.getElementById('g-recaptcha-error').innerHTML = '';
}








