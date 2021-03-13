const queue = require('../config/kue');
const resetPassMailer = require('../mailers/reset_password_mailer');

queue.process('resetPasswordEmail'  , function(job , done){

    console.log("worker for password reset mails !");
    resetPassMailer.passResetToken(job.data);
    done();

})