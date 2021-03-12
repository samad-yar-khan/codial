const express = require('express');
const router = express.Router();

const accountsController = require('../controllers/accounts_controller');

router.get('/forgot-pass' , accountsController.forgotPass);
router.post('/verify-email' , accountsController.verifyEmail);
module.exports = router;