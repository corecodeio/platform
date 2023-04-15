const express = require('express');
const router = express.Router();
const { listRoles } = require('./../../controllers/management/role.controllers');
const authManagement = require('./../../middlewares/auth.management');
const checkPermissionAuth = require('./../../middlewares/auth.permissions.js');

//List Roles
router.get('/', authManagement, checkPermissionAuth(['read:role']), listRoles);

module.exports = router;
