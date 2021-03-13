const User = require('../models/user');
const crypto = require('crypto'); //pre isntalled in node now 
const ResetPassToken = require('../models/reset_pass_token');
const nodemailer = require('../config/nodemailer');
const resetPassMailer = require('../mailers/reset_password_mailer');

module.exports.forgotPass = function(req , res){

    return res.render('forgot_pass' ,{

        title : "Forgot Password" ,
        heading : 'Forgot Password'

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
            req.flash('success' , 'Password Reset Link sent !!');
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

module.exports.resetPass=async function(req, res){

    let token = req.query.accessToken;

    let accessToken = await ResetPassToken.findOne({'accessToken':token});
    if(accessToken && accessToken.isValid){
        return res.render('reset_pass' , {

            title:"RESET PASSWORD",
            heading:"RESET PASSWORD",
            accessToken:token,
        });
    }else{
        req.flash('error' , "Unauthorized !");
        return res.redirect('back');
    }

    

}

module.exports.resetPassFinal= async function(req, res){

    if(req.body.password != req.body.confirmPassword){
        req.flash('error' , "PASSWORDS DONT MATCH");
        return res.redirect('back');
    }

    try {
        let token = req.body.accessToken;
        let accessToken = await ResetPassToken.findOne({'accessToken':token});

        if(accessToken && accessToken.isValid){
            let user =await User.findById(accessToken.user);
            user.password = req.body.password;
            await user.save();

            accessToken.remove();

            req.flash('success' , "Password Reset Successfull!");
            return res.redirect('/users/sign-in');
        }else{
            req.flash('error' , "Unauthorized !");
           return res.redirect('back');
        }

    } catch (err) {
        req.flash('error' ,"error in resetting password");
        console.log("error in resetting password", err)
           return res.redirect('back');
    }
 
    
}