const express = require('express');
const router = express.Router();
const { sendMessage } = require('./../controllers/messageControllers');
const auth = require('./../middlewares/auth');

//Send Message
router.post('/send', auth, sendMessage);

module.exports = router;
