
const express = require('express');
const router = express.Router();

const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile' , usersController.profile);
router.get('/posts' ,usersController.posts);
router.get('/sign-in' , usersController.signIn);
router.get('/sign-up' ,usersController.signUp);
router.post('/create' , usersController.create);

//use passport as a middleware to authenticate
router.post('/create-session' , passport.authenticate(
    'local', //
    {failureRedirect : '/users/sign-in'}) //if the authentication fails then we are sent to this route
    ,usersController.createSession ); //if authentication validates  then we ares sent to the controller automatically


module.exports = router;



