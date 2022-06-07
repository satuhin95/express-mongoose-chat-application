//external import
const express = require('express');

// internat import 
const {getInbox} = require('../controller/inboxController');
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse');

const router = express.Router();

//inbox page
router.get('/',decorateHtmlResponse("Inbox"),getInbox);


module.exports = router;

