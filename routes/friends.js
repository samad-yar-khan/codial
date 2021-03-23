const express = require('express');
const router = express.Router();
const passport = require('passport');

const friendsController = require('../controllers/friends_controller');

router.get('/toggle/' , passport.checkAuthentication ,friendsController.toggleUser); 

module.exports = router;