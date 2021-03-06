const express = require("express");

const router = express.Router();

const homeController = require("../controllers/home_controller");

console.log("router loaded");

router.get('/' , homeController.home);
router.get('/login' , homeController.homeLogin);
router.use('/users' , require('./users'));
router.use('/posts' , require('./posts'));
router.use('/comments' , require('./comments'));
router.use('/help' , require('./help'));
router.use('/api' , require('./api'));
router.use('/accounts' , require('./accounts'));
router.use('/likes' , require('./likes'));
router.use('/friends' , require('./friends'));



module.exports = router;