var express = require('express');
var router = express.Router();
var tenderController = require('../controllers/tenderController.js');
const isAuthenticated = require('../middleware/auth.js');


router.get('/', tenderController.getClosedTenders);
router.get('/:tenderId', isAuthenticated, tenderController.getClosedTenderWithBidsById);

module.exports = router;