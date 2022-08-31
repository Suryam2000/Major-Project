const nodemailer = require('../config/nodemailer');

exports.newPass = (user, accesstoken) => {
    
    let htmlString = nodemailer.renderTemplate({user: user, accesstoken: accesstoken}, '/resetPass/resetpass.ejs');

    nodemailer.transporter.sendMail({
        from: 'suryam@social.com',
        to: user.email,
        subject: "Social! Reset Password",
        html: htmlString
    }, (err, info) => {
        if(err){ console.log(err); return; }
        return;
    });
}; 