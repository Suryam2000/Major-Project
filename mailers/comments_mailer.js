const nodemailer = require('../config/nodemailer');

exports.newComment = (comment, post) => {
    
    let htmlString = nodemailer.renderTemplate({comment: comment, post: post}, '/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from: 'suryam@social.com',
        to: post.user.email,
        subject: "Social!",
        html: htmlString
    }, (err, info) => {
        if(err){ console.log(err); return; }
        return;
    });
}; 