const passport=require('passport');
const googleStartegy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/register');
const bcrypt=require('bcrypt')


passport.use(new googleStartegy({
    clientID:"10061900115-6jogvgseapiarg2fs13jl7o64opgsoic.apps.googleusercontent.com",
    clientSecret:"a0soihKGpjJ9xGVpYbOrjLh7",
    callbackURL:"http://localhost:8000/users/auth/google/callback",
    
    },
    function(accessToken,refreshToken,profile,done){
        //find a user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
       if(err){
           Console.log("error in google startegy pasport");
           return;
       }
    
       console.log(profile);
    
       if(user){
           //if found set this to req.user
          
           return done(null,user);
       }else{
           let pass=crypto.randomBytes(20).toString('hex')
           //if not found.create the user
           bcrypt.hash(pass, 8, function(err, hash) {
            if(err){console.log("error in encrypting password");return;}
            // Store hash in your password DB.
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:hash,
                active:true
            },function(err,user){
                if(err){Console.log("error in creating user by google");return;}
               
                return done(null,user);
            })
        });
       }
        });
    }
    
    ));
    
    module.exports=passport;
    


