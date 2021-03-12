const User = require('../models/user');

module.exports.forgotPass = function(req , res){

    return res.render('forgot_pass' ,{

        title : "Forgot Password" ,
        heading : 'Reset Password'

    })

}

