const express = require('express');
const router = express.Router();
const {
    logIn,
    checkToken,
    listStaff,
    readStaff,
    createStaff,
    editStaff,
    deleteStaff
} = require('./../../controllers/management/staff.controllers');
const authManagement = require('./../../middlewares/auth.management');
const checkPermissionAuth = require('./../../middlewares/auth.permissions.js');
//log In
router.post('/log-in', logIn);
//Check Token
router.post('/check-token', authManagement, checkToken);
//List All Staff
router.get('/list', authManagement, checkPermissionAuth('read:staff'), listStaff);
//Read Staff
router.get('/', authManagement, checkPermissionAuth('read:staff'), readStaff);
//Create Staff
router.post('/', authManagement, checkPermissionAuth('write:staff'), createStaff);
//Edit Staff
router.put('/', authManagement, checkPermissionAuth('edit:staff'), editStaff);
//delete Staff
router.delete('/', authManagement, checkPermissionAuth('delete:staff'), deleteStaff);

module.exports = router;
