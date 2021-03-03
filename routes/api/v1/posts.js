const express = require('express');

const router = express.Router();
const postsApi = require('../../../controllers/api/v1/posts_api');
const passport = require('passport');

router.get('/' , postsApi.index);
router.delete('/:id' , passport.authenticate('jwt' , {session : false}) , postsApi.destroy);
//passport will put an authentication check on out delete request and by setting session to false  we tell passport to not generate sessio cookies


module.exports = router;