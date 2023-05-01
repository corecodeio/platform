const express = require('express');
const router = express.Router();
const { listPermissions } = require('./../controllers/permissionControllers');
const auth = require('./../middlewares/auth');
const checkPermissions = require('./../middlewares/checkPermissions');

//List Permissions
router.get('/', auth, checkPermissions(['read:permission']), listPermissions);

module.exports = router;
