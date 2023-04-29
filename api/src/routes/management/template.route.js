const express = require('express');
const router = express.Router();
const { listTemplates } = require('./../../controllers/management/template.controllers');
const authManagement = require('./../../middlewares/auth.management');
const checkPermissionAuth = require('./../../middlewares/auth.permissions.js');

//List Templates
router.get('/', authManagement, checkPermissionAuth(['read:course']), listTemplates);

module.exports = router;