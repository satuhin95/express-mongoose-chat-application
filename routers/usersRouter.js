//external import
const express = require('express');

// internat import 
const {getUsers} = require('../controller/userController');
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse');

const router = express.Router();

//users page
router.get('/',decorateHtmlResponse("Users"),getUsers);


module.exports = router;

