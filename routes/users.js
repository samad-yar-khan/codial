
const express = require('express');
const router = express.Router();

const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id' , passport.checkAuthentication ,usersController.profile);
router.get('/posts' ,usersController.posts);
router.get('/sign-in' , usersController.signIn);
router.get('/sign-up' ,usersController.signUp);
router.post('/create' , usersController.create);
router.post('/update/:id' , passport.checkAuthentication , usersController.update);


//use passport as a middleware to authenticate
router.post('/create-session' , passport.authenticate(
    'local', //
    {failureRedirect : '/users/sign-in'}) //if the authentication fails then we are sent to this route
    ,usersController.createSession ); //if authentication validates  then we ares sent to the controller automatically


router.get('/sign-out' , usersController.destroySession);


//google auth
//scope is the persmission we need to take or the datd we need frrom google 
//the below route is given to us by passport and it is what takkes us to google directly
router.get('/auth/google' , passport.authenticate('google' , {scope : ['profile' , 'email'] })); 
router.get('/auth/google/callback' ,passport.authenticate('google' , {failureRedirect : '/users/sign-in'}) , usersController.createSession) // this is the url where we receive the data 


module.exports = router;



