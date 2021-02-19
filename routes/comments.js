
const express = require('express');
const router = express.Router();

const passport = require('passport'); //will be used to autheticate a use before making changes to comments
const commentsController = require('../controllers/comments_controller');

router.post('/create' ,  passport.checkAuthentication , commentsController.create);
router.get('/destroy' , passport.checkAuthentication , commentsController.destroy);

module.exports=router;
