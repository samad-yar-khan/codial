// http://www.passportjs.org/docs/configure/

const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

//import the user
const User = require('../models/user');

//now we need to tell passport to us ethe local strategy
passport.use( new LocalStrategy({

    usernameField : 'email' //this is a property set by our pasport and we set it to our email as thats gonna be used as the username
    }, function (email,password,done) { //done is a callback function
    //find user and estaablish the identity 
    //the first username here is the email key in our user and the second is the email passed by us
    User.findOne( {email:email} , function (err,user) {
        //handling error
        if(err){
            console.log("Error finding user ---> passport !");
            return done(err);
        }

        //see if user exists and password match or not
        if(!user || user.password != password){
            console.log("invalid username password!");
            return done(null , false); //false indicates that we couldnt authorize the user
        }else{
            return done(null , user); 
        }

     
    })
}));

//now like earlier , upon signin , some data was sent to the  broweser by us in the form of a cookie ,we do a similiar thing here
//but here the data sselected by us is encrypted and sent to the broweser as a ccookie by passport using SERIALIZING

passport.serializeUser(function(user, done) {
    return done(user.id);
});


//this part of the code is a deserializer 
//its checks the incoming requests for a cookie and see if a user is already logges in 
//decrypts the incoming user id and uses it to access the user data from the db and send it back to the browser
passport.deserializeUser(function(id , done) {
    User.findById(id , function (err , user) {
        if(err){
            console.log("Error finding user ---> passport !");
            return done(err);
        }

        return done(null,user);
    });
});

module.exports =passport;