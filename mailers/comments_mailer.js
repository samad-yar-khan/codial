const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment)=>{

    
    let htmlString = nodeMailer.renderTemplate({comment:comment} , '/comments/new_comment.ejs')

    nodeMailer.transporter.sendMail({
        from:"samad.ic19@nsut.ac.in",
        to : comment.user.email,
        subject: "New Comment Published!",
        html :htmlString
    } , function(err,info){//write callback to check fr errors
        if(err){
            console.log("error in sending mail : " ,err);
            return;
        }

        console.log("Message Sent !" , info);
        return;
    })
  
}

