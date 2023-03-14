const express = require('express');
const router = express.Router();
const { listPermissions } = require('./../../controllers/management/permission.controllers');
const authManagement = require('./../../middlewares/auth.management');
const checkPermissionAuth = require('./../../middlewares/auth.permissions.js');

//List Permissions
router.get('/', authManagement, checkPermissionAuth('read:permission'), listPermissions);

module.exports = router;
