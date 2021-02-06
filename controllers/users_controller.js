//also called an action

const User = require("../models/user");
const db = require("../config/index");
const { user } = require("../config/index");

//these are all actions
module.exports.profile = function(req ,res){
    
    // if(req.query.email== undefined){
    //     return res.redirect('/users/sign-in')
    // }

    // return res.render('user_profile' , {
    //    title : "PROFILE",
    //    heading : "PROFILE PAGE",
    //    userName:req.query.name,
    //    userEmail:req.query.email
    // });

    if(req.cookies.user_id){
        
        User.findById(req.cookies.user_id , function(err , user){
            if(err || !user){ //if error or users not presen
                console.log("invalid user!");
                return res.redirect('/users/sign-in');
            }else{
                return res.render('user_profile',{
                        title : "PROFILE",
                        heading : "PROFILE PAGE",
                        userName:user.name,
                        userEmail:user.email
                })
            }
            
        });


    }else{
        
        return res.redirect('/users/sign-in');
    }

};

module.exports.posts = function(req,res){
    res.end('<h1>POST FOR USER</h1>');
} ;

//render the sign up page
module.exports.signUp = function (req , res) {

    //before sign in or sign out check if user is already logged in our not
    
    return res.render('user_sign_up' , {
        title : "CODIAL|SIGNUP",
    });

}

//RENDER THE SIGN IIN PAGE
module.exports.signIn = function (req , res) {

    //before entering the sign in page e check if a vali cookie exits ,, with the username 
    //if the cookie exots we redirect to the profile page where the logged in  user profile is shown
    // if(req.cookies.user_id){
    //     User.findById(req.cookies.user_id , function(err , user){
    //         if(err || !user){ //if error or users not presen
    //             console.log("invalid user!");
            
    //         }else{
    //           return res.redirect('/user/profile');
    //         }
            
    //     });
    // }



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
            return res.redirect('/users/sign-in');
        }
    });

}

//create session for the user after sign in 
module.exports.createSession = function (req, res) {
    //we check if the user with the given mail even exist or not
    //if user exist then we match pass
    //if pass maatches we got to profile , else we are redicted to login
    User.findOne({email:req.body.email} , function(err , user) {


        if(err){
            console.log("Unable to login !");
            return res.redirect('back');
        }

        if(!user){ //user does not exist
            console.log("User not found !");
            return res.redirect('/users/sign-up');
        }else{

            if(user.password == req.body.password){
                res.cookie('user_id' , user._id);
                // var rUrl = "/users/profile/?name="+user.name;
                // rUrl += "&email="+user.email;
                return res.redirect("/users/profile");
            }else{
                console.log(" Wrong Password !");
                return res.redirect('back');
            }

        } 
   
    } );
    
};

module.exports.logout = function (req,res) {

    res.cookie('user_id', {expires: Date.now()});
    return res.redirect('/users/sign-in');

}