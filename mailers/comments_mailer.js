const nodemailer = require('../config/nodemailer');

exports.newComment = (comment, post) => {
    
    let htmlString = nodemailer.renderTemplate({comment: comment, post: post}, '/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from: 'suryam@social.com',
        to: comment.user.email,
        subject: "New Comment Published!",
        html: htmlString
    }, (err, info) => {
        if(err){ console.log(err); return; }

        console.log("Message sent", info);
        return;
    });
}; 