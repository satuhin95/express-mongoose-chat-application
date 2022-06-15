//external import
const express = require('express');

// internat import 
const {getInbox} = require('../controller/inboxController');
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse');
const {checkLogin} = require('../middleware/common/checkLogin');

const router = express.Router();

//inbox page
router.get('/',decorateHtmlResponse("Inbox"),checkLogin,getInbox);


module.exports = router;

