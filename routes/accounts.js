const express = require('express');
const router = express.Router();

const accountsController = require('../controllers/accounts_controller');

router.get('/forgot-pass' , accountsController.forgotPass);
router.post('/verify-email' , accountsController.verifyEmail);
router.get('/reset/' , accountsController.resetPass);
router.post('/reset-pass-final' , accountsController.resetPassFinal );
module.exports = router;