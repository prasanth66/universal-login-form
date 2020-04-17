const nodeMailer=require('../config/nodemailer');

//function which helps to send mail regarding passwords
exports.newPassword=(changePassword)=>{
    nodeMailer.transporter.sendMail({
        from:'prasanthkdp6@gmail.com',
        to:changePassword.email,
        subject:"Change password Request",
        html:changePassword.password
    },(err,info)=>{
        if(err){console.log("error in sending mail",err);return;}
        console.log('message sent',info);
        return;
    });
}


