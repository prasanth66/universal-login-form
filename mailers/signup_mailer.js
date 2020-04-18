const nodeMailer=require('../config/nodemailer');


//this is another way of exporting
//this helps to notify user that account is created via mail
exports.newSignup=(signup)=>{
     
    let htmlString=nodeMailer.renderTemplete({signup:signup},'/signup.ejs');
    
    nodeMailer.transporter.sendMail({
        from:'prasanthkdp6@gmail.com',
        to:signup.email,
        subject:"New User Sign-in",
        html:htmlString
    },(err,info)=>{
        if(err){console.log("error in sending mail",err);return;}
        console.log('message sent',info);
        return;
    });
}


