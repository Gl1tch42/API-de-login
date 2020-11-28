const express = require('express');
const router = express.Router();
const { register, login, emailSend } = require('./../controllers/authControler');


router.post('/register', register);
router.post('/login', login);
router.post('/mail', emailSend);




module.exports = router;