const express = require('express');
const router = express.Router();
const { newPostulation,listPostulation,postulationDetails } = require('./../../controllers/student/postulation.controllers');
const authStudent = require('./../../middlewares/auth.student');

//List Postulation
router.get('/', authStudent, listPostulation);
//Postulation details
router.get('/details/:id', authStudent, postulationDetails);
//New Postulation
router.post('/', authStudent, newPostulation);

module.exports = router;
