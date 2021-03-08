const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment)=>{

    console.log('inside new comment mailer');
    let htmlSring = nodeMailer.renderTemplate({comment:comment} , '/comments/new_comment.ejs')

    nodeMailer.transporter.sendMail({
        from:"samad.ic19@nsut.ac.in",
        to : comment.user.email,
        subject: "New Comment Published!",
        html :htmlSring
    } , function(err,info){//write callback to check fr errors
        if(err){
            console.log("error in sending mail : " ,err);
            return;
        }

        console.log("Message Sent !" , info);
        return;
    })

}

