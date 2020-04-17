const bcrypt=require('bcrypt');
const user=require('../models/register');
const signupMailer=require('../mailers/signup_mailer');
const passwordMailer=require('../mailers/password_mailer');
const crypto=require('crypto');

//rendering home page
module.exports.home=function(req,res){
   
    return res.render('home');
};


//method to register new user
module.exports.register=async function(req,res){
 try{
    let data=await user.find({email:req.body.email});
     
    if(data.length==0){
        let hash=await bcrypt.hash(req.body.password,8);//encrypting the password
        user.create({
            name:req.body.name,
            email:req.body.email,
            password:hash
        });
        
        signupMailer.newSignup(req.body.email);//sending notification through mail
        return res.redirect('back');
    }
    else
    return res.redirect('back');
 }catch(err){
      console.log('Error',err);
      return;
 }

}


var userIdentity;
module.exports.login=function(req,res){
     userIdentity=req.body.email;
    req.flash('success','Logged in successfully');
    return res.render("base");
}


module.exports.forgotPassword=function(req,res){
    return res.render('forgotPassword');
}


module.exports.createPassword=function(req,res){
    let pass=crypto.randomBytes(4).toString('hex')
    //checking whether mail exists or not
  user.find({email:req.body.email},function(err,data){
      if(err || data.length==0){console.log("error in fnding email to change password");return res.redirect('/');}
  
      bcrypt.hash(pass, 8, function(err, hash) {
        // Store hash in your password DB.
        if(err){console.log("error in encrypting password",err);return;}
           user.findOneAndUpdate({email:req.body.email},{password:hash},function(err){

        if(err){console.log("error in changing password");return;}
        
        //sending the changed password to the user
        let changePass={
            email:req.body.email,
            password:pass
        }
        passwordMailer.newPassword(changePass);
        return res.redirect('/');
    })

    });
  

  })
}


//user sign out
module.exports.signOut=function(req,res){
    req.logout();
    
    return res.redirect('/');
}
// userIdentity
//method to change password
module.exports.changepassword= function(req,res){
    user.find({email:userIdentity},function(err,data){
        if(err || data.length==0){console.log("error in fnding email to change password");return res.redirect('back');}
    
        bcrypt.hash(req.body.newPassword, 8, function(err, hash) {
          // Store hash in your password DB.
          if(err){console.log("error in encrypting password",err);return;}
             user.findOneAndUpdate({email:userIdentity},{password:hash},function(err){
  
          if(err){console.log("error in changing password");return;}
          
          //sending the changed password to the user
         
          return res.render('base');
      })
  
      });
    
  
    })
}





