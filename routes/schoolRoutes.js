const express = require('express');
const router = express.Router();
const { addSchool, listSchools } = require('../controllers/schoolController');

//authentication can also be done before api is called by the user in the routes by defining middleware and passing it in the routes

router.post('/addSchool', addSchool);

router.get('/listSchools', listSchools);

module.exports = router;
