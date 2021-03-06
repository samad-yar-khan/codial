const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto'); //pre isntalled in node now  
const User = require("../models/user");

//tell passport to use a new stargtegy for google login
passport.use( new googleStrategy({ // first arg. is  the options

        clientID : "582821821390-gm5gfjmvb0etffmnhp31tk4db3m7dcj0.apps.googleusercontent.com",
        clientSecret : "Va9YwBqXwevhpH3fuST1ZJyo",
        callbackURL : "http://localhost:8000/users/auth/google/callback"//same as set in google while regesterings
    },
    function(accessToken , refreshToken , profile , done) {//second arg is the callback function
        //this contains 4 args 1)access token like we ste up up in api authentication whene we used jwts as ascess tokes
                            // 2)refres token which automaticallly refresehs ourtoken before expiration
                            //3)profile is the profile of the user which google sends and it can have varios info about the user dependig on the permissions
                            //4)done is a callbackfunction

        //firt we need to finf this user in our own db
        //user has multiple emalis hence we hence we choose the frst email
        // console.log(profile);
        //console.log(accessToken)  // will give a definit value and cna be used repeatedly to acess the users info
        //console.log(refershToken) //this will give null as , we must set up and ask for a refresh token , this should be tehre so figure ths out
        User.findOne({email:profile.emails[0].value} ).exec(function(err , user){
            if(err){
                console.log("error in google strategy - passport : " , err);
                return;
            }

            //if a user with the same email is found we send back the suer to passport and it returns the user to the broser and sets it in the local of the browser
            if(user){
                return done(null , user);///login /sets the user as req.user now in our local
            }else{
                //if user is not found then we create the user in our db with the given email , name and set its password using crypto

                User.create({
                    name:profile.displayName ,
                    email:profile.emails[0].value ,
                    password : crypto.randomBytes(20).toString('hex')//passord of 20 byts made from hex and converted to string
                } , function(err  , user){
                    if(err){
                        console.log("error creating user in db( google strategy - passport ): " , err);
                        return;
                    }

                    return done(null , user);
                });


            }
        });
    }
    ));

    module.export = passport;



