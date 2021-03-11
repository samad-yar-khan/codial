const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');


//https://kinsta.com/blog/gmail-smtp-server/ 
//port 587 is for tls hence we used that
//transporter define show communication  taes place
let transporter = nodemailer.createTransport({

    service : 'gmail' ,
    host : 'smtp.gmail.com'  ,
    port : 587 , //need for tls
    secure : 'false' ,
    auth : {
        user : "samad.ic19@nsut.ac.in" ,
        pass : "pass"
    }

});

//now we need to tell that we will need ejs for template engine
const renderTemplate = (data,relativePath) => {
    let mailHTML ;

    ejs.renderFile(
        path.join(__dirname , '../views/mailers' , relativePath), //the path to our ejs file
        data , //data to be put in the ejs file
        function(err , template) { //callback function

            if(err){
                console.log("error inrendering email template" ,err);
                return;
            }

            mailHTML = template;

        }   
    )

    return mailHTML;

}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}
