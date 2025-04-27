var express = require('express');
var router = express.Router();
var tenderController = require('../controllers/tenderController.js');


router.get('/', tenderController.getClosedTenders);

// GET user tenders //TODO: do poprawy
router.get('/:userid', tenderController.getAllUserTenders);

module.exports = router;