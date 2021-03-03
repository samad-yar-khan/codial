const  express = require('express');
const router = express.Router();


const postsApi = require('../../../controllers/api/v2/posts_api');

const passport = require('passport');

router.get('/' , postsApi.index);
router.delete('/:id' , passport.authenticate('jwt' , {session : false}) , postsApi.destroy);




module.exports = router ;