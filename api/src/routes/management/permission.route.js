const express = require('express');
const router = express.Router();
const { listPermission } = require('./../../controllers/management/permission.controllers');
const authManagement = require('./../../middlewares/auth.management');
const checkPermissionAuth = require('./../../middlewares/auth.permissions.js');

//List Course Type
router.get('/', authManagement, checkPermissionAuth('read:permission'), listPermission);

module.exports = router;
