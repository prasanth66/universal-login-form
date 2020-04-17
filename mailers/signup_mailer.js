const nodeMailer=require('../config/nodemailer');


//this is another way of exporting
//this helps to notify user that account is created via mail
exports.newSignup=(signup)=>{
    console.log("inside new signup",signup);
    nodeMailer.transporter.sendMail({
        from:'prasanthkdp6@gmail.com',
        to:signup,
        subject:"New User Sign-in",
        html:"You have successfully created an account!!!"
    },(err,info)=>{
        if(err){console.log("error in sending mail",err);return;}
        console.log('message sent',info);
        return;
    });
}


