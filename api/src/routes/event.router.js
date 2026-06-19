const express = require('express');
const router = express.Router();
const { createEvent } = require('./../controllers/eventControllers');
const auth = require('./../middlewares/auth');

router.post('/', auth, createEvent);

module.exports = router;
