const express = require('express');
const router = express.Router();
const {
    newPostulation,
    listPostulation,
    postulationDetails
} = require('./../controllers/postulationControllers');
const auth = require('./../middlewares/auth');

//List Postulation
router.get('/', auth, listPostulation);
//Postulation details
router.get('/details/:id', auth, postulationDetails);
//New Postulation
router.post('/', auth, newPostulation);

module.exports = router;
