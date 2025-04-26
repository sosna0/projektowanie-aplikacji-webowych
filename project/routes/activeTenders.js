var express = require('express');
var router = express.Router();
const tenderController = require('../controllers/tenderController.js');


// GET active tenders - rendered as HTML
router.get('/', tenderController.getActiveTenders);

// GET user tenders //TODO: do poprawy
router.get('/:userid', tenderController.getAllUserTenders);

module.exports = router;