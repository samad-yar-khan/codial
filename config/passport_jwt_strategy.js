const passport = require('passport');
const JWTStategy = require('passport-jwt').Strategy; //to make the authizationa and set the token
const ExtractJWT = require('passport-jwt').ExtractJwt;


const User = require('../models/user');

const opts = {
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey : "codial"
}

passport.use(new JWTStategy(opts , function(jwtPayLoad, done){

    User.findById(jwtPayLoad._id , function(err , user){
        if(err){
            console.log("Error in finding user from jwt " , err);
            return;
        }

        if(user){
            return done(null , user);
        }else{
            return done(null , false);
        }
    })

}));

module.exports = passport;