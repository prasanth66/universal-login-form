const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/register');
const db=require('./mongoose');
const bcrypt=require('bcrypt');




//authentication user passport
passport.use(new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback:true
},

function(req,email,password,done){
   
 //find a user and establish the identity
 User.findOne({email:email},function(err,user){
     if(err){
        //  console.log("error in finding email--->passport");
        req.flash('error',err);
         return done(err);  
     }
     if(!user){
        return done(null,false);
     }
     bcrypt.compare(password, user.password, function(err, result) {
        // result == true
        if(err){
            //  console.log("error in finding email--->passport");
            req.flash('error',err);
             return done(null,false);  
         }
        if( result==false){
            //   console.log("invalid username or password");
            req.flash('error',"invalid username/password");
              return done(null,false);
             }
             return done(null,user);
    });
     
     
     
 });
}

));

//serialising the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
done(null,user.id);

});


//deserialisng the user from the  key in the coookies
passport.deserializeUser(function(id,done){
   User.findById(id,function(err,user){
       if(err){
        console.log("error in finding email--->passport");
        return done(err); 
       }
       return done(null,user);
   });
});

//check if user is authenticated
passport.checkAuthentication=function(req,res,done){
    //if the user is signed in ,then pass on the rquest to the next function('controllers action)
   if(req.isAuthenticated()){
       return next();
   }
   //if the user is not signed sign in
    return res.redirect('/');

}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed user from currentcokie.we are sending to local viesw 
       res.locals.user=req.user
    }
    next();
}

module.exports=passport;