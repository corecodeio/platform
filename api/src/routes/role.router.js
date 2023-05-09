const express = require('express');
const router = express.Router();
const {
    createRole,
    listRoles,
    deleteRole,
    removeRoleAssociation
} = require('./../controllers/roleControllers');
const auth = require('./../middlewares/auth');
const checkPermissions = require('./../middlewares/checkPermissions');

//Create Role
router.post('/', auth, checkPermissions(['write:role']), createRole);
//List Roles
router.get('/', auth, checkPermissions(['read:role']), listRoles);
//Delete Role
router.delete('/', auth, checkPermissions(['delete:role']), deleteRole);
//Remove Role Association
router.delete('/association', auth, checkPermissions(['delete:role']), removeRoleAssociation);

module.exports = router;
