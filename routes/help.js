//now make arouter 

const express = require('express');

const router = express.Router();

//get the controller
const helpController = require('../controllers/help_controller');

router.get('/FAQ' , helpController.faq);

router.get('/login' , helpController.helpLogin);

router.get('/privacy' , helpController.helpPrivacy);


//export the  roouter
module.exports = router;