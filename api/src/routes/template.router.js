const express = require('express');
const router = express.Router();
const { listTemplates } = require('./../controllers/templateControllers');
const auth = require('./../middlewares/auth');
const checkPermissions = require('./../middlewares/checkPermissions');

//List Templates
router.get('/', auth, checkPermissions(['read:course']), listTemplates);

module.exports = router;
