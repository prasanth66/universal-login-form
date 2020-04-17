const express=require('express');
const app=express();
const port=8000;
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const MongoStore=require('connect-mongo')(session);
const flash=require('connect-flash');
const bodyParser=require('body-parser');


require('./config/passport-google-oauth2-strategy');
require('./config/passport-local-strategy');
const customMware=require('./config/middleware');

app.use(express.urlencoded());

app.use(express.static('./assests'));
app.set('view engine','ejs');
app.set('views','./views');



//mongostore is used to store the cookie in db

app.use(session({
    name:'login',
    //to do change the secret before deployment
    secret:'something',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store: new MongoStore(
        {
        
            mongooseConnection:db,
            autoRemove:'disabled'
        
    },
      function(err){
          console.log(err || 'connect mongodb setup ok');
      }
    )
    }));

    app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(customMware.setFlash);


app.use('/',require('./routes'));


//setting up the server
app.listen(port,function(err){
    if(err){console.log("error n runniing the server",err);return;}
    console.log("server is up and runnng",port);
})