const express = require('express');
const router = express.Router();
const { createEvent } = require('./../controllers/eventControllers');
const auth = require('./../middlewares/auth');
const checkPermissions = require('./../middlewares/checkPermissions');

router.post('/', auth, checkPermissions(['write:event']), createEvent);

module.exports = router;
