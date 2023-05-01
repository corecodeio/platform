const express = require('express');
const router = express.Router();
const {
    listRoles,
    deleteRole,
    removeRoleAssociation
} = require('./../controllers/roleControllers');
const auth = require('./../middlewares/auth');
const checkPermissions = require('./../middlewares/checkPermissions');

//List Roles
router.get('/', auth, checkPermissions(['read:role']), listRoles);
//Delete Role
router.delete('/', auth, checkPermissions(['delete:role']), deleteRole);
//Remove Role Association
router.delete('/association', auth, checkPermissions(['delete:role']), removeRoleAssociation);

module.exports = router;
