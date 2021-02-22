//also called an action

const User = require("../models/user");
const Post = require("../models/post");
const db = require("../config/index");
const { Cookie } = require("express-session");


//these are all actions
module.exports.profile = function(req ,res){

    User.findById(req.params.id , function(err, myUser){
        if(err){
            console.log("USER NOT FOUND !");
            return;
        }

        return res.render('user_profile' , {
            title : "PROFILE",
            heading : "PROFILE PAGE",
            profile_user: myUser
         });

    })
}

module.exports.posts = function(req,res){
    res.end('<h1>POST FOR USER</h1>');
} ;

//this funtcion will check if a user is already sighned in or not 
//and if its signed in , then we will be directed to profile 
//we can use this to avid sieng signup / sign in pages even when logged in
function checkSignedIn(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
}


//render the sign up page
module.exports.signUp = function (req , res) {
    
    checkSignedIn(req,res);//if we are sighne in already we are directed to the profile page

    return res.render('user_sign_up' , {
        title : "CODIAL|SIGNUP",
    });

}

//RENDER THE SIGN IIN PAGE
module.exports.signIn = function (req , res) {

    checkSignedIn(req,res); //if we are sighne in already we are directed to the profile page

    
    return res.render('user_sign_in' , {
        title:"CODIAL|SIGNIN"
    });

}

//Controller to handlle the sign up , when data is sent from the browser
module.exports.create = function (req , res) {
    
    //first we need to check if the passwords match or not 
    if(req.body.password != req.body.confirmPassword){
        console.log("Pas words dont match !");
        return res.redirect('back');
    }

    //if(users also presnt we cant make anew user)
    User.findOne({email : req.body.email} , function (err,user) {
        if(err){
            console.log("error fiinding user!");
        }

        //if user is not present or if user is empty we add the user to db
        if(!user){
            User.create(req.body,function (err) {
                if(err){
                    console.log("error adding new user to db ");
                    return res.redirect('back');
                }else{
                    return res.redirect('/users/sign-in');
                }
            }); //this will add teh fieldd which match between the scehema and the req.body too our db and the confirmed password would not be added

        }else{
            return res.redirect('back');
        }
    });

}

//create session for the user after sign in 
module.exports.createSession = function (req, res) {
    return res.redirect('/');
}

module.exports.destroySession = function(req , res){

    req.logout(); //this will log out the user using passport js

    return res.redirect('/');
}

