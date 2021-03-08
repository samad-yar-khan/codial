const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment)=>{

    console.log('inside new comment mailer')

    nodeMailer.transporter.sendMail({
        from:"samad.ic19@nsut.ac.in",
        to : comment.user.email,
        subject: "New Comment Published!",
        html :"<h1>Your Comment has been Published!</h1>"
    } , function(err,info){//write callback to check fr errors
        if(err){
            console.log("error in sending mail : " ,err);
            return;
        }

        console.log("Message Sent !" , info);
        return;
    })

}

