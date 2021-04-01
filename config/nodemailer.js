const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const environment = require('./environment');


//https://kinsta.com/blog/gmail-smtp-server/ 
//port 587 is for tls hence we used that
//transporter define show communication  taes place
let transporter = nodemailer.createTransport(environment.smtp);

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
