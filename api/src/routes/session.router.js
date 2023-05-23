const express = require('express');
const router = express.Router();
const { createSession } = require('./../controllers/sessionControllers');
const auth = require('./../middlewares/auth');
const checkPermissions = require('./../middlewares/checkPermissions');

//Create Session
router.post('/', auth, checkPermissions(['write:course']), createSession);

module.exports = router;
