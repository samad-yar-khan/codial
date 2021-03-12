const User = require('../models/user');
const crypto = require('crypto'); //pre isntalled in node now 
const ResetPassToken = require('../models/reset_pass_token');
const nodemailer = require('../config/nodemailer');
const resetPassMailer = require('../mailers/reset_password_mailer');

module.exports.forgotPass = function(req , res){

    return res.render('forgot_pass' ,{

        title : "Forgot Password" ,
        heading : 'Reset Password'

    })

}

module.exports.verifyEmail = async function(req , res){
    

    //first we find the the email mentioned in the form
    const userEmail = req.body.email;
    console.log(req.body);
    try {
        const user = await User.findOne({email : userEmail});
        
        if(user){
            const accessToken =  crypto.randomBytes(20).toString('hex');//access token for email 

            const token = await  ResetPassToken.create({
                user : user._id,
                accessToken : accessToken ,
                isValid : true 
            } );

            const myToken = await token.populate('user' , 'name email').execPopulate() ;   
            resetPassMailer.passResetToken(token);  
            req.flash('sucess' , 'Password Reset Link sent !!');
            return res.redirect('back');
        
        }else{
            req.flash('error' , 'Invalid User !');
            return res.redirect('back');
        }

    } catch (error) {
        req.flash('error' , error);
        console.log(error);
        return res.redirect('back');
    }
  
}
