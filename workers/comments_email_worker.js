const queue = require('../config/kue');
const commentsMailer = require('../mailers/comments_mailer');

//every worker has a process to get the jobs done or add it to the quequq
//earlier we were sending the mail from the controler itself and calling the 
// commentsMailer.newComment(comment) function in the controller itself 
//but now as we are calling it here we will call this worker in the controller
queue.process('emails' , function(job , done){

    console.log('emails worker is processing a job : ' , job.data);

    commentsMailer.newComment(job.data) ; //job.dtaa contains teh eamail content

    done();
})