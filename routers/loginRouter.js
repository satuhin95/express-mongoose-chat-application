//external import
const express = require('express');

// internat import 
const {getLogin, login, logout} = require('../controller/loginController');
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse');
const {doLoginValidators, doLoginValidatonHandler} = require("../middleware/login/loginValidators")
const {redirectLoggedIn} = require('../middleware/common/checkLogin');

const router = express.Router();

//login page
router.get('/',decorateHtmlResponse('Login'),redirectLoggedIn, getLogin);

// login
router.post('/', decorateHtmlResponse('Login'),doLoginValidators,doLoginValidatonHandler, login);

//logout
router.delete('/',logout);

module.exports = router;








