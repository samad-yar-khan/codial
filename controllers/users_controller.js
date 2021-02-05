//also called an action

const { model } = require("../config");

//these are all actions
module.exports.profile = function(req ,res){
    
    return res.render('user_profile' , {
       title : "PROFILE",
       heading : "PROFILE PAGE" 
    });
};

module.exports.posts = function(req,res){
    res.end('<h1>POST FOR USER</h1>');
} ;

//render the sign up page
module.exports.signUp = function (req , res) {
    
    return res.render('user_sign_up' , {
        title : "CODIAL|SIGNUP",
    });

}

//RENDER THE SIGN IIN PAGE
module.exports.signIn = function (req , res) {
    
    return res.render('user_sign_in' , {
        title:"CODIAL|SIGNIN"
    });

}

//Controller to handlle the sign up , when data is sent from the browser
module.exports.create = function (req , res) {
    
}

//create session for the user after sign in 
module.exports.createSession = function (req, res) {
    
}