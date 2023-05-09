const express = require('express');
const router = express.Router();
const { listTemplates, createTemplate } = require('./../controllers/templateControllers');
const auth = require('./../middlewares/auth');
const checkPermissions = require('./../middlewares/checkPermissions');

//Create Template
router.post('/', auth, checkPermissions(['write:course']), createTemplate);
//List Templates
router.get('/', auth, checkPermissions(['read:course']), listTemplates);

module.exports = router;
