const User = require('../models/user');
const crypto = require('crypto'); //pre isntalled in node now 
const ResetPassToken = require('../models/reset_pass_token');

module.exports.forgotPass = function(req , res){

    return res.render('forgot_pass' ,{

        title : "Forgot Password" ,
        heading : 'Reset Password'

    })

}

module.exports.verifyEmail = function(req , res){
    

    //first we find the the email mentioned in the form
    const userEmail = req.body.email;
    console.log(req.body);

    User.findOne({email : userEmail} , function(err , user){
        if(err){
            console.log("Error finding user in databsse for resetting of password : " ,err);
            return;
        }

        if(user){
            const accessToken =  crypto.randomBytes(20).toString('hex');//access token for email 

            ResetPassToken.create({
                user : user._id,
                accessToken : accessToken ,
                isValid : true 
            } , function(err , token){

                if(err){
                    console.log("Error Creating Access Token " , err );
                    return;
                }

                let resetUrl = `localhost:8000/accounts/reset/?accessToken=${accessToken}`;
                console.log(resetUrl);
                return res.redirect('back');
            })

        }else{
            req.flash('error' , 'User Not Found !');
            return res.redirect('back');
        }
    })
    


}
