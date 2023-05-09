const express = require('express');
const router = express.Router();
const {
    createPermission,
    listPermissions,
    deletePermission
} = require('./../controllers/permissionControllers');
const auth = require('./../middlewares/auth');
const checkPermissions = require('./../middlewares/checkPermissions');

//Create Permission
router.post('/', auth, checkPermissions(['write:permission']), createPermission);
//List Permissions
router.get('/', auth, checkPermissions(['read:permission']), listPermissions);
//List Permissions
router.delete('/', auth, checkPermissions(['delete:permission']), deletePermission);

module.exports = router;
