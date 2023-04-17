const express = require('express');
const router = express.Router();
const {
    listRoles,
    deleteRole,
    removeRoleAssociation
} = require('./../../controllers/management/role.controllers');
const authManagement = require('./../../middlewares/auth.management');
const checkPermissionAuth = require('./../../middlewares/auth.permissions.js');

//List Roles
router.get('/', authManagement, checkPermissionAuth(['read:role']), listRoles);
//Delete Role
router.delete('/', authManagement, checkPermissionAuth(['delete:role']), deleteRole);
//Remove Role Association
router.delete('/association', authManagement, checkPermissionAuth(['delete:role']), removeRoleAssociation);

module.exports = router;
